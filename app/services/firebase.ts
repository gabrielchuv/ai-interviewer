import { db } from '../../firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
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