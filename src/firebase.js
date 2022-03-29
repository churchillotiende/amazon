import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAqbRBVISYYEfYboWBdcwqMm02pg3-FIwE",
  authDomain: "clone-9fe9d.firebaseapp.com",
  projectId: "clone-9fe9d",
  storageBucket: "clone-9fe9d.appspot.com",
  messagingSenderId: "859464378243",
  appId: "1:859464378243:web:011afb150342b039da78b6",
  measurementId: "G-FE71LDDBNP"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export {db , auth}

