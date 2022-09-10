import './constants/refs';
import './queue';
import './watched';
import './modalCard';
import './modalAbout';
import './upToTop';
import { setToLocalLybraryStorege } from './constants/storage';

import {
  singUp,
  singIn,
  logOut,
  getData,
  postData,
  authObserver,
} from './api/firebase/api';

setToLocalLybraryStorege();

const email = document.getElementById('email_singUp');
const password = document.getElementById('password_singUp');

const btnSingUp = document.getElementById('btn_singUp');
const btnSingIn = document.getElementById('btn_singIn');
const btnLogOut = document.getElementById('btn_logout');

const btnToPost = document.getElementById('btnToPost');
const btnToRequest = document.getElementById('btnToRequest');

authObserver();

btnSingUp.addEventListener('click', async e => {
  e.preventDefault();
  singUp(email.value, password.value);
});

btnSingIn.addEventListener('click', e => {
  e.preventDefault();
  singIn(email.value, password.value);
});

btnLogOut.addEventListener('click', () => {
  logOut();
});

btnToPost.addEventListener('click', async () => {
  postData(usersFilms);
});

btnToRequest.addEventListener('click', async () => {
  a = await getData();
  console.log(a);
});
