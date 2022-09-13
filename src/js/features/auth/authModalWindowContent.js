import { singUp, singIn, logOut, auth } from '../../api/firebase/api';
import { dynRefs } from '../../constants/dynamicRefs';
import { refs } from '../../constants/refs';
import modalAuthTpl from '../../../templates/auth-modal.hbs';
import closeSvg from '../../../images/sprite.svg';

export function showAuthorisedFields() {
  const { LoggedIn, notLoggedIn, userEmail } = dynRefs();
  if (notLoggedIn) {
    notLoggedIn.style.display = 'none';
    LoggedIn.style.display = 'block';
    userEmail.innerHTML = auth.currentUser.email;
  }
}

export function showUnauthorisedFields() {
  const { LoggedIn, notLoggedIn, userEmail } = dynRefs();
  if (notLoggedIn) {
    notLoggedIn.style.display = 'block';
    LoggedIn.style.display = 'none';
    userEmail.innerHTML = '';
  }
}

const modal = document.querySelector('[data-backdrop]');

refs.authBtn.addEventListener('click', e => {
  e.preventDefault();
  document.body.classList.add('show-modal-card');
  const html = modalAuthTpl({ closeSvg: closeSvg });
  modal.innerHTML = html;

  const {
    // emailSignUp,
    // passwordSignUp,
    // emailSignIn,
    // passwordSignIn,
    // btnSingUp,
    // btnSingIn,
    switchSignUpBtn,
    switchSignInBtn,
    authContainer,
    btnLogOut,
    formLogIn,
    formSignUp,
  } = dynRefs();

  if (auth.currentUser) {
    // from /api/firebase/api
    showAuthorisedFields();
  } else {
    showUnauthorisedFields();
  }

  document.body.style.overflow = 'hidden';
  const closeModalBtnEl = document.querySelector('[data-modal-close]');
  const backdropEl = document.querySelector('[data-backdrop]');
  if (closeModalBtnEl) {
    closeModalBtnEl.addEventListener('click', onCloseModalAuth);
  }
  backdropEl.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEscKeyPressExitAuth);

  switchSignUpBtn.addEventListener('click', () => {
    authContainer.classList.add('right-panel-active');
  });

  switchSignInBtn.addEventListener('click', () => {
    authContainer.classList.remove('right-panel-active');
  });

  formSignUp.addEventListener('submit', async e => {
    e.preventDefault();
    const { email, password } = e.currentTarget.elements;
    singUp(email.value, password.value);
  });

  formLogIn.addEventListener('submit', async e => {
    e.preventDefault();
    const { email, password } = e.currentTarget.elements;
    singIn(email.value, password.value);
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