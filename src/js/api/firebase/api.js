import { initializeApp } from 'firebase/app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import {
  getDoc,
  doc,
  setDoc,
  getFirestore,
  collection,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAOVRWfbjHfPu1ndIo-owvcZQ3uVte-DR4',
  authDomain: 'filmoteka-fa3c9.firebaseapp.com',
  projectId: 'filmoteka-fa3c9',
  storageBucket: 'filmoteka-fa3c9.appspot.com',
  messagingSenderId: '574871161042',
  appId: '1:574871161042:web:330b8801ecd986e360850b',
};

// Initialize Firebase, Auth, Firestore

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
// // // // // // // // // // // // //
const btn_logOut = document.getElementById('btn_logout');
const notLoggedIn = document.getElementById('not-logged-in');
const LoggedIn = document.getElementById('logged-in');

const userEmail = document.getElementById('user_email');

let usersFilms = {
  watched: [],
  queue: [],
};

export function singUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      // let usersFilms = ;
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
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      userEmail.innerHTML = user.email;
    })
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

export function authObserver(/*loggedIn, notLoggedIn*/) {
  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      getData().then(e => {
        localStorage.dataFromDB = JSON.stringify(e);
      });

      // loggedIn;
      notLoggedIn.style.display = 'none';
      LoggedIn.style.display = 'block';
      userEmail.innerHTML = user.email;
    } else {
      // User is signed out
      localStorage.removeItem('dataFromDB');
      // notLoggedIn;

      usersFilms = localStorage.getItem('usersFilms');
      notLoggedIn.style.display = 'block';
      LoggedIn.style.display = 'none';
      // console.log(usersFilms);
    }
  });
}