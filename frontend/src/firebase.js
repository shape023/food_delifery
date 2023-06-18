import { initializeApp } from "firebase/app"
// import "firebase/firebase-storage"
import { getFirestore, serverTimestamp } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp(
  {
    apiKey: "AIzaSyBquOta7pEG-i71zp8WWBT1FVs98wFo0vY",
    authDomain: "food-1a119.firebaseapp.com",
    projectId: "food-1a119",
    storageBucket: "food-1a119.appspot.com",
    messagingSenderId: "440339077678",
    appId: "1:440339077678:web:a11162eab31502021d1dbf",
    measurementId: "G-X7S3Q7YS0E"
  }
);

 export const firestore = getFirestore(firebaseApp)
 export const auth = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp)
 export const db={
    pizzas:'allProducts',
    
    formatedDoc:doc=>{
      return{id:doc.id,...doc.data()}
    },
    getCurrentTimeStamp:serverTimestamp,
  }