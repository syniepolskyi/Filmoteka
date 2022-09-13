import { initializeApp } from 'firebase/app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';


import { getDoc, doc, setDoc, getFirestore } from 'firebase/firestore';

import { firebaseConfig } from './firebaseConfig';

import { dynRefs } from '../../constants/dynamicRefs';

// Initialize Firebase, Auth, Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();
// // // // // // // // // // // // //

export function singUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;

      postData(
        {
          watched: [],
          queue: [],
        },
        user.uid
      );
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
      // ..
    });
}

export function singIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {})
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

export function logOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      // An error happened.
    });
}

export async function getData() {
  try {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      localStorage.dataFromDB = JSON.stringify(docSnap.data());
      return docSnap.data();
    } else {
      console.log('База фильмов пуста');
    }
  } catch (e) {
    console.error('Error receiving document: ', e);
  }
}

export async function postData(usersFilmsObj, uid = auth.currentUser.uid) {
  try {
    const userData = doc(db, 'users', uid);

    await setDoc(userData, usersFilmsObj, { merge: true });

    console.log('Document written with ID: ', userData.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export function authObserver(fncLogIn, fncNotLog) {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log('observer run. user exist');
      if (fncLogIn) {
        fncLogIn.forEach(element => element());
      }

      getData().then(e => {
        localStorage.dataFromDB = JSON.stringify(e);
      });
    } else {
      const { notLoggedIn, LoggedIn } = dynRefs();
      console.log('observer run. no user');
      if (fncNotLog) {
        fncNotLog.forEach(func => func());
      }

      localStorage.removeItem('dataFromDB');
      //usersFilms = localStorage.getItem('usersFilms');
    }
  });
}
