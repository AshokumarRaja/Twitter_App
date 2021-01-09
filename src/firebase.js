import * as firebase from "firebase";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyAkUiaMAotBOT7GJHblVk2gC9h37myNPiY",
  authDomain: "twitter-19942.firebaseapp.com",
  databaseURL: "https://twitter-19942-default-rtdb.firebaseio.com",
  projectId: "twitter-19942",
  storageBucket: "twitter-19942.appspot.com",
  messagingSenderId: "885295846850",
  appId: "1:885295846850:web:26f1ed981eabb8bea6b25b",
  measurementId: "G-E726X9TNF2",
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
