import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBLVSGF4GPkTAkDbj808uUeCdt3S6lLgDM",
    authDomain: "ai-interviewer-afec4.firebaseapp.com",
    projectId: "ai-interviewer-afec4",
    storageBucket: "ai-interviewer-afec4.firebasestorage.app",
    messagingSenderId: "582414900431",
    appId: "1:582414900431:web:7d530434316c692f6b6bba",
    measurementId: "G-PRJ59EPZH0"};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);