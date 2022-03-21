import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDZePeDpfPzJ5A-mAlm7V3eYu-mDOaPaaE",
  authDomain: "react-app-9bf68.firebaseapp.com",
  projectId: "react-app-9bf68",
  storageBucket: "react-app-9bf68.appspot.com",
  messagingSenderId: "556235310776",
  appId: "1:556235310776:web:51eb675381fc7e0883d64d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
}