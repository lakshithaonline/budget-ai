import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAfVBtCr6G5s3NXiw4Ml0drwq-zFhAJSrE",
    authDomain: "budget-ai-c4f66.firebaseapp.com",
    projectId: "budget-ai-c4f66",
    storageBucket: "budget-ai-c4f66.firebaseapp.com",
    messagingSenderId: "980496043171",
    appId: "1:980496043171:web:c7cbc27172374cb167c316",
    measurementId: "G-DTGF101LYZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
