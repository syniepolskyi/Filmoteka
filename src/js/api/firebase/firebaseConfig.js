import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import {
  getAuth
} from 'firebase/auth';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyAOVRWfbjHfPu1ndIo-owvcZQ3uVte-DR4',
  authDomain: 'filmoteka-fa3c9.firebaseapp.com',
  projectId: 'filmoteka-fa3c9',
  storageBucket: 'filmoteka-fa3c9.appspot.com',
  messagingSenderId: '574871161042',
  appId: '1:574871161042:web:330b8801ecd986e360850b'
};

export const db = getFirestore(initializeApp(firebaseConfig));
export const auth = getAuth();
// // // // // // // // // // // // //
