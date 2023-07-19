import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUW_smxcLTmU0SKlZkGt62Jcr1f5joy1A",
  authDomain: "surfen-c0856.firebaseapp.com",
  projectId: "surfen-c0856",
  storageBucket: "surfen-c0856.appspot.com",
  messagingSenderId: "876204524845",
  appId: "1:876204524845:web:dbb1c33601feca00e43fa4",
  measurementId: "G-SV2WJLLJSG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
if (analytics) {
  console.log("analytics configured");
}

// Firebase storage reference
const fireStorage = getStorage(app);
export default fireStorage;
