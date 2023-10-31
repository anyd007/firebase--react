import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCG6LoqOyXTQE3vMq1otwJzJCd7QHEKdTQ",
  authDomain: "fir-course-9fb99.firebaseapp.com",
  projectId: "fir-course-9fb99",
  storageBucket: "fir-course-9fb99.appspot.com",
  messagingSenderId: "905949696290",
  appId: "1:905949696290:web:4d4a9acc137ff50c26157b",
  measurementId: "G-DV30YQV7FK"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app);
export const storage = getStorage(app);