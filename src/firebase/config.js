import { initializeApp, getApps, getApp } from '@firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUPubmybfSbqiySysFsq3zgJ2pyWxhN_s",
  authDomain: "exodus-xperts.firebaseapp.com",
  projectId: "exodus-xperts",
  storageBucket: "exodus-xperts.appspot.com",
  messagingSenderId: "782985181827",
  appId: "1:782985181827:web:b2ce3be9709f67e3d579b6"
};
// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp(); 

// init services
  const db = getFirestore(app)
  const Auth = getAuth(app)
  const storage = getStorage(app);
  
  export { db, storage, Auth }