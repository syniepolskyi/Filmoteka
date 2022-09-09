import './api/moviedb/getMoviesDetails';
import modalInputTpl from '../templates/modal-card.hbs';
import Handlebars from 'handlebars';
import closeSvg from '../images/sprite.svg';
import fallbackImageDesktop from '../images/desktop/poster-modal-plug-desktop.jpg';

const modal = document.querySelector('[data-backdrop]');

export default function openModalCard(movie, customHtml = '') {
  document.body.classList.add('show-modal-card');

  //   console.log('Show Modal', this);

  if(movie && !customHtml){
    movie.closeSvg = closeSvg;
    movie.fallbackImageDesktop = fallbackImageDesktop;
    const html = modalInputTpl(movie);
    modal.innerHTML = html;
  }
  
  if(customHtml){
    modal.innerHTML = customHtml;
  }

  const closeModalBtnEl = document.querySelector('[data-modal-close]');
  const backdropEl = document.querySelector('[data-backdrop]');

  if(closeModalBtnEl){
  closeModalBtnEl.addEventListener('click', onCloseModalCard);
  }
  backdropEl.addEventListener('click', onBackdropClick);

  window.addEventListener('keydown', onEscKyePressExit);
}

function onCloseModalCard() {
  document.body.classList.remove('show-modal-card');
  window.addEventListener('keydown', onEscKyePressExit);
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModalCard();
  }
}

function onEscKyePressExit(event) {
  if (event.code === 'Escape') {
    onCloseModalCard();
  }
}

//для окруклення індексу Popularity в modal-card.hbs
Handlebars.registerHelper('numberFixed', function (number) {
  return number.toFixed(1);
});
