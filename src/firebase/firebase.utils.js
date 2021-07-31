import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';



const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "crwn-db-eafc6.firebaseapp.com",
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: "crwn-db-eafc6.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

 // set up Google authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


