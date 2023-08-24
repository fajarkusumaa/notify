import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDOyEOVNDzc7_vCP0hPPYMmjefd5XGbvXU",
    authDomain: "notify-397e4.firebaseapp.com",
    projectId: "notify-397e4",
    storageBucket: "notify-397e4.appspot.com",
    messagingSenderId: "764887890574",
    appId: "1:764887890574:web:eaf4a7db12ae35202267df",
    measurementId: "G-3FZJT9R59F"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider, db };
export default firebaseApp;