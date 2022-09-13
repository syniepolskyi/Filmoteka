import { refs } from '../../constants/refs';


const themeSwither = refs.changeTheme;
const changeThemeCssLink = refs.changeThemeCssLink;

themeSwither.forEach(swither => swither.addEventListener(`click`, changeTheme));

function changeTheme() {
  localStorage.setItem(`theme`, this.dataset.theme);

  if (this.dataset.theme === `onDark`) {
    changeThemeCssLink.disabled = false;
  }
  if (this.dataset.theme === `onLight`) {
    changeThemeCssLink.disabled = true;
  }
}

let activeTheme = localStorage.getItem(`theme`);

if (activeTheme === null || activeTheme === `onLight`) {
  changeThemeCssLink.disabled = true;
} 
else {
  changeThemeCssLink.disabled = false;
}
