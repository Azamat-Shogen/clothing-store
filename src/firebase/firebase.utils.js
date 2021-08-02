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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth)// if null ( there is no user signed in
    return ; // dont do anything / exit from this function

  const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();

  if(!snapShot.exists){
      // if the snapShot doesnt exist create
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
          await userRef.set({ // create user
              displayName,
              email,
              createdAt,
              ...additionalData
          })
      } catch (error) {
         console.log('error creating user ', error.message())
      }
  }

  // this function always returns a userRef
    console.log(userRef)
    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

 // set up Google authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


