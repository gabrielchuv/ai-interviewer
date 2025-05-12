import { db } from '../../firebaseConfig';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, getDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Question, questionBank } from '../data/questionBank';

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
    // Find the user document in the userEmails collection
    const userQuery = query(
      collection(db, 'userEmails'),
      where('uid', '==', user.uid)
    );
    
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      console.error('User document not found');
      return -1; // Return -1 to signal an error
    }
    
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    
    // If the interviewsRemaining field doesn't exist yet
    if (userData.interviewsRemaining === undefined) {
      console.warn('interviewsRemaining field not defined for user:', user.uid);
      // Return -1 to signal that the value couldn't be determined
      return -1;
    }
    
    return userData.interviewsRemaining;
  } catch (error) {
    console.error('Error getting interviews remaining:', error);
    return -1; // Return -1 to signal an error
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
    
    // If interviewsRemaining is undefined, we can't decrement
    if (userData.interviewsRemaining === undefined) {
      console.error('interviewsRemaining field is undefined for user:', user.uid);
      return false;
    }
    
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
    let currentCount = 0;
    
    if (userData.interviewsRemaining === undefined) {
      console.warn('interviewsRemaining field not defined for user:', user.uid);
      console.log('Initializing interviewsRemaining with count:', count);
    } else {
      currentCount = userData.interviewsRemaining;
    }
    
    await updateDoc(userDoc.ref, {
      interviewsRemaining: currentCount + count
    });
    
    return true;
  } catch (error) {
    console.error('Error adding interview credits:', error);
    return false;
  }
};

/**
 * Gets an array of question IDs that the user has previously seen
 */
export const getUserSeenQuestions = async (): Promise<number[]> => {
  try {
    const user = await getCurrentUser();
    
    // Check if user history document exists
    const userHistoryRef = doc(db, 'userQuestionHistory', user.uid);
    const userHistoryDoc = await getDoc(userHistoryRef);
    
    if (!userHistoryDoc.exists()) {
      // Initialize with empty array if document doesn't exist
      await setDoc(userHistoryRef, { seenQuestions: [] });
      return [];
    }
    
    const userData = userHistoryDoc.data();
    return userData.seenQuestions || [];
  } catch (error) {
    console.error('Error getting user seen questions:', error);
    return [];
  }
};

/**
 * Adds a question ID to the user's seen questions list
 */
export const addQuestionToUserHistory = async (questionId: number): Promise<boolean> => {
  try {
    const user = await getCurrentUser();
    
    const userHistoryRef = doc(db, 'userQuestionHistory', user.uid);
    
    // Use arrayUnion to add the question ID if it doesn't already exist
    await updateDoc(userHistoryRef, {
      seenQuestions: arrayUnion(questionId)
    }).catch(async (error) => {
      // If document doesn't exist yet, create it
      if (error.code === 'not-found') {
        await setDoc(userHistoryRef, { 
          seenQuestions: [questionId] 
        });
      } else {
        throw error;
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error adding question to user history:', error);
    return false;
  }
};

/**
 * Gets a question that the user has not seen before.
 * If testing mode is enabled, this restriction is ignored.
 * If all questions have been seen, returns a random question.
 */
export const getNewQuestionForUser = async (testingMode: boolean = false): Promise<Question> => {
  // If in testing mode, just return a random question
  if (testingMode) {
    return questionBank[Math.floor(Math.random() * questionBank.length)];
  }
  
  try {
    return questionBank[0];
    // Get questions the user has already seen
    const seenQuestionIds = await getUserSeenQuestions();
    console.log("Seen question IDs:", seenQuestionIds);
    
    // Filter out questions the user has already seen
    const unseenQuestions = questionBank.filter(q => !seenQuestionIds.includes(q.id));
    console.log("Unseen questions:", unseenQuestions);
    // If there are unseen questions, return a random one from that set
    if (unseenQuestions.length > 0) {
      return unseenQuestions[Math.floor(Math.random() * unseenQuestions.length)];
    }
    
    // If all questions have been seen, return a random question
    return questionBank[Math.floor(Math.random() * questionBank.length)];
  } catch (error) {
    console.error('Error getting new question for user:', error);
    // Fallback to random question on error
    return questionBank[Math.floor(Math.random() * questionBank.length)];
  }
}; 