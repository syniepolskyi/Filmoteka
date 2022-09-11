const themeSwither = document.querySelectorAll(`.change_theme`);

const changeThemeCssLink = document.querySelector(`[title= "theme"]`);


themeSwither.forEach(swither =>
  swither.addEventListener(`click`, function () {

    if (this.dataset.theme === `onDark`) {
      console.log(this.dataset.theme);
      console.log(changeThemeCssLink.disabled);
      changeThemeCssLink.disabled = false;
      

    }
    if (this.dataset.theme === `onLight`) {
      console.log(this.dataset.theme);
      console.log(changeThemeCssLink.disabled);
      changeThemeCssLink.disabled = true;

    }
  })
);

