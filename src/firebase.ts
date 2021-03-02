import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCeER6YZTi2m3_EXoFq6sCTBCWiCYROihE',
  authDomain: 'react-todo-2ad17.firebaseapp.com',
  projectId: 'react-todo-2ad17',
  storageBucket: 'react-todo-2ad17.appspot.com',
  messagingSenderId: '807564659019',
  appId: '1:807564659019:web:4b62c5f38d0190b8ba80ce',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
