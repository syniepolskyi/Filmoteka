export const dynRefs = () => {
  return {
    addToWatchedBtn: document.querySelector('.modal-card__watched-btn'),
    addToQueueBtn: document.querySelector('.modal-card__queue-btn'),
    emailSignUp: document.getElementById('email_signUp'),
    emailSignIn: document.getElementById('email_signIn'),
    passwordSignUp: document.getElementById('password_signUp'),
    passwordSignIn: document.getElementById('password_signIn'),
    btnSingUp: document.getElementById('btn_singUp'),
    btnSingIn: document.getElementById('btn_singIn'),
    btnLogOut: document.getElementById('btn_logout'),
    notLoggedIn: document.getElementById('not-logged-in'),
    LoggedIn: document.getElementById('logged-in'),
    userEmail: document.getElementById('user_email')
  };
};
