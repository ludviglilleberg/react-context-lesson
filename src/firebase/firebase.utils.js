import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: "AIzaSyD079fZIKe0vz9oKZkdlfTf1SPaortTSUM",
  authDomain: "crwn-db-2a5b7.firebaseapp.com",
  projectId: "crwn-db-2a5b7",
  storageBucket: "crwn-db-2a5b7.appspot.com",
  messagingSenderId: "1026611495210",
  appId: "1:1026611495210:web:c7004f4aa7b8eb91b49e53",
  measurementId: "G-6398MPGPZT"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
