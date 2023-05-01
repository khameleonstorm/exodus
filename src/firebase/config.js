import { initializeApp, getApps, getApp } from '@firebase/app';
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "firebase/storage";
const cron =  require('node-cron');



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

  // Define your task function that updates the profit for all users
async function updateProfit() {
  // Get a reference to the transactions collection
  const transactionsRef = collection(db, 'transactions');

  // Query the transactions collection to get all transactions
  const transactionsSnapshot = await getDocs(transactionsRef);

  // Loop through each transaction and update the user's profit
  transactionsSnapshot.forEach(async (transaction) => {
    // Get the transaction data and duration
    const { day, userId, profit } = transaction.data();

    // Get a reference to the user document in the profiles collection
    const userRef = doc(db, 'profiles', userId);

    // Update the user's profit in the user document
    await updateDoc(userRef, { profit });
  });
}

// Schedule the updateProfit function to run every 24 hours
cron.schedule('0 0 */1 * *', updateProfit);
  
  export { db, storage, Auth }