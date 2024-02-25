import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// const { initializeApp } = require("firebase/app");
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCHK-MQ5i6sULcTb4GoZNLmxoWHB7DRp8Q",
  authDomain: "tesis-eb719.firebaseapp.com",
  projectId: "tesis-eb719",
  storageBucket: "tesis-eb719.appspot.com",
  messagingSenderId: "292815251141",
  appId: "1:292815251141:web:422e7e78f7d9b40bbff2ac",
  measurementId: "G-NCKS5KPRMJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
