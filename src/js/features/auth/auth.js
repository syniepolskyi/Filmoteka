import { async } from '@firebase/util';
import {
  singUp,
  singIn,
  logOut,
  getData,
  postData,
  authObserver,
} from '../../api/firebase/api';

import {dynRefs} from '../../constants/dynamicRefs';
import { refs } from '../../constants/refs';
import modalAuthTpl from '../../../templates/auth-modal.hbs';
import closeSvg from '../../../images/sprite.svg';


authObserver();

const modal = document.querySelector('[data-backdrop]');

refs.authBtn.addEventListener('click', e => {
  e.preventDefault();
  document.body.classList.add('show-modal-card');
  const html = modalAuthTpl({closeSvg: closeSvg});
  modal.innerHTML = html;
  const {
    emailSignUp,
    passwordSignUp,
    emailSignIn,
    passwordSignIn,
    btnSingUp,
    btnSingIn,
    btnLogOut,
    LoggedIn,
    notLoggedIn,
    userEmail
  } = dynRefs();

  if(e.currentTarget.dataset.email){
    notLoggedIn.style.display = 'none';
    LoggedIn.style.display = 'block';
    userEmail.innerHTML = e.currentTarget.dataset.email;
  } else {
    notLoggedIn.style.display = 'block';
    LoggedIn.style.display = 'none';
    userEmail.innerHTML = '';
  }

  document.body.style.overflow = 'hidden';
  const closeModalBtnEl = document.querySelector('[data-modal-close]');
  const backdropEl = document.querySelector('[data-backdrop]');
  if (closeModalBtnEl) {
    closeModalBtnEl.addEventListener('click', onCloseModalAuth);
  }
  backdropEl.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEscKeyPressExitAuth);

  btnSingUp.addEventListener('click', async e => {
    e.preventDefault();
    singUp(emailSignUp.value, passwordSignUp.value);
  });

  btnSingIn.addEventListener('click', e => {
    e.preventDefault();
    singIn(emailSignIn.value, passwordSignIn.value);
  });

  btnLogOut.addEventListener('click', () => {
    logOut();
  });
});

function onCloseModalAuth() {
  const closeModalBtnEl = document.querySelector('[data-modal-close]');
  const backdropEl = document.querySelector('[data-backdrop]');
  // додає в session storege копію localstorege
  document.body.style.overflow = null;
  document.body.classList.remove('show-modal-card');
  window.addEventListener('keydown', onEscKeyPressExitAuth);

  backdropEl.removeEventListener('click', onBackdropClick);
  closeModalBtnEl.removeEventListener('click', onCloseModalAuth);
  window.removeEventListener('keydown', onEscKeyPressExitAuth);
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModalAuth();
  }
}

function onEscKeyPressExitAuth(event) {
  if (event.code === 'Escape') {
    onCloseModalAuth();
  }
}

/*
  btnToPost.addEventListener('click', async () => {
    postData(usersFilms);
  });
  
  btnToRequest.addEventListener('click', async () => {
    a = await getData();
    console.log(a);
  });
  */
