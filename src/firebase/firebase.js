import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBGSlrMWNMwyRJxA43WDl9eQJowWvI0GuQ",
  authDomain: "smart-study-58d97.firebaseapp.com",
  projectId: "smart-study-58d97",
  storageBucket: "smart-study-58d97.appspot.com",
  messagingSenderId: "756205028983",
  appId: "1:756205028983:web:9b361f4ee393651d96a872",
  measurementId: "G-TVFDXJ2BD8"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});


export { auth, db, storage };