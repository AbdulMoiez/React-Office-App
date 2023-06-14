import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDvfnK3gN4GLmd66uTM6cDXhseCr_Ml-aI",
    authDomain: "office-expense-app.firebaseapp.com",
    projectId: "office-expense-app",
    storageBucket: "office-expense-app.appspot.com",
    messagingSenderId: "446478974890",
    appId: "1:446478974890:web:3ee6cbec7f516736f8b5d3"
  };
  Firebase.initializeApp(firebaseConfig)

  export default Firebase;  