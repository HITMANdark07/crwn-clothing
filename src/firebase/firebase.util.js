import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCN_kOqYZSIReBoMq_KQYfyi56mBXsDqj8",
    authDomain: "crwn-clothing-db-c7ef9.firebaseapp.com",
    databaseURL: "https://crwn-clothing-db-c7ef9.firebaseio.com",
    projectId: "crwn-clothing-db-c7ef9",
    storageBucket: "crwn-clothing-db-c7ef9.appspot.com",
    messagingSenderId: "444999736774",
    appId: "1:444999736774:web:0270206c1e8c3d2b99a6c7",
    measurementId: "G-8GBYRRCL6N"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
   if (!userAuth) return;
   
   const userRef = firestore.doc(`users/${userAuth.uid}`);

   const snapShot = await userRef.get();
   if (!snapShot.exists) {
     const { displayName, email} = userAuth;
     const createdAt = new Date();

     try{
       await userRef.set({
         displayName,
         email,
         createdAt,
         ...additionalData
       })
     } catch (error) {
       console.log('error creating user', error.message);
     }
   }

   return userRef;

  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;