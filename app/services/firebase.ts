import { db } from '../../firebaseConfig';
import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

interface FeedbackSection {
  rating: number;
  feedback: string;
}

interface FeedbackData {
  technicalDepth: FeedbackSection;
  problemSolving: FeedbackSection;
  codeQuality: FeedbackSection;
}

const getCurrentUser = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        reject(new Error('No authenticated user found'));
      }
    });
  });
};

export const storeFeedback = async (feedbackData: FeedbackData) => {
  const user = await getCurrentUser();
  
  const overallScore = Math.round(
    (feedbackData.technicalDepth.rating +
      feedbackData.problemSolving.rating +
      feedbackData.codeQuality.rating) / 4
  );

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const feedbackToStore = {
    userId: user.uid,
    date: formattedDate,
    timestamp: currentDate,
    overallScore,
    clarification: feedbackData.technicalDepth,
    approach: feedbackData.problemSolving,
    codeQuality: feedbackData.codeQuality,
    userEmail: user.email,
  };

  try {
    const docRef = await addDoc(collection(db, 'feedback'), feedbackToStore);
    return docRef.id;
  } catch (error) {
    console.error('Error storing feedback:', error);
    throw error;
  }
};

export const getUserFeedback = async () => {
  const user = await getCurrentUser();

  const q = query(
    collection(db, 'feedback'),
    where('userId', '==', user.uid)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getUserInterviewsRemaining = async (): Promise<number> => {
  try {
    const user = await getCurrentUser();
    console.log("user", user);
    // Find the user document in the userEmails collection
    const userQuery = query(
      collection(db, 'userEmails'),
      where('uid', '==', user.uid)
    );

    console.log("userQuery", userQuery);
    
    const userSnapshot = await getDocs(userQuery);

    console.log("userSnapshot", userSnapshot);
    if (userSnapshot.empty) {
      console.error('User document not found');
      return 0;
    }
    
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    console.log("userData.interviewsRemaining", userData.interviewsRemaining);
    
    // If the interviewsRemaining field doesn't exist yet, default to 3 (or whatever your default is)
    if (userData.interviewsRemaining === undefined) {
      // Initialize the field with a default value
      await updateDoc(userDoc.ref, {
        interviewsRemaining: 0
      });
      return 3;
    }
    
    return userData.interviewsRemaining;
  } catch (error) {
    console.error('Error getting interviews remaining:', error);
    return 0;
  }
};

export const decrementInterviewsRemaining = async (): Promise<boolean> => {
  try {
    const user = await getCurrentUser();
    
    // Find the user document
    const userQuery = query(
      collection(db, 'userEmails'),
      where('uid', '==', user.uid)
    );
    
    const userSnapshot = await getDocs(userQuery);
    
    if (userSnapshot.empty) {
      console.error('User document not found');
      return false;
    }
    
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    
    // If the user has interviews remaining, decrement the count
    if (userData.interviewsRemaining && userData.interviewsRemaining > 0) {
      await updateDoc(userDoc.ref, {
        interviewsRemaining: userData.interviewsRemaining - 1
      });
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error decrementing interviews remaining:', error);
    return false;
  }
};

export const addInterviewCredits = async (count: number): Promise<boolean> => {
  try {
    const user = await getCurrentUser();
    
    // Find the user document
    const userQuery = query(
      collection(db, 'userEmails'),
      where('uid', '==', user.uid)
    );
    
    const userSnapshot = await getDocs(userQuery);
    
    if (userSnapshot.empty) {
      console.error('User document not found');
      return false;
    }
    
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    
    // Add the specified count to the existing interviewsRemaining, or initialize if undefined
    const currentCount = userData.interviewsRemaining || 0;
    
    await updateDoc(userDoc.ref, {
      interviewsRemaining: currentCount + count
    });
    
    return true;
  } catch (error) {
    console.error('Error adding interview credits:', error);
    return false;
  }
}; 