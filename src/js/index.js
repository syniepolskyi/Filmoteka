import './constants/refs';
import './api/moviedb/getTrending';
import './api/moviedb/searchMovies';
// import openModalCard from './modalCard';
import './modalAbout';
import './upToTop';
import './slider-trends';

// import { getTrending } from './api/moviedb/getTrending';

// import { changeGenresIdtoName } from './api/moviedb/changeGenresIdtoName';
// import { searchMovies, search } from './api/moviedb/searchMovies';
// import createMarkUp from '../templates/film-cards.hbs';
import { refs } from './constants/refs';
// import Notiflix from 'notiflix';
// import { createPagination } from './createPagination';
import Handlebars from 'handlebars';

import {
  singUp,
  singIn,
  logOut,
  getData,
  postData,
  authObserver,
} from './api/firebase/api';

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
  postData({
    watched: ['test'],
    queue: ['test'],
  });
});

btnToRequest.addEventListener('click', async () => {
  const a = await getData();
  console.log(a);
});

// import openModalCard from './modalCard';
// import { getMoviesDetails } from './api/moviedb/getMoviesDetails';
import { async } from '@firebase/util';

import { renderTrendingMoviesSetup } from './renderMovieList';
import { onSearchFormSubmit } from './onSearchFormSubmit';
// import { trendsSearchParams, movieSearchParams } from './serchMoviesParam';
import { onPaginationBtnClick } from './onPaginationBtnClick';

// async function renderTrendingMoviesSetup(page = 1) {
//   search.params = trendsSearchParams;
//   search.params.params.page = page;

//   renderMovieList(page);
// }

// async function renderSearchListSetup(nameForSrc, page = 1) {
//   search.params = movieSearchParams;
//   search.params.params.page = page;
//   search.params.params.query = nameForSrc;

//   renderMovieList(page);
// }

renderTrendingMoviesSetup();
refs.paginationBox.addEventListener('click', onPaginationBtnClick);

// фіксять рік там рейтинг на картках фільмів
Handlebars.registerHelper('yearFixed', function (number) {
  let today = new Date('2000-07-06');
  let year = today.getFullYear();
  return year;
});

Handlebars.registerHelper('numberFixed', function (number) {
  return number.toFixed(1);
});

refs.headerForm.addEventListener('submit', onSearchFormSubmit);

// function onSearchFormSubmit(name) {
//   name.preventDefault();

//   const nameForSrc = name.target.serch_film.value.trim();
//   if (!nameForSrc) {
//     Notiflix.Notify.warning('Searching starts after providing data to search.');
//     return;
//   }

//   renderSearchListSetup(nameForSrc);
// }

// function onFilmCardClick() {
//   const id = this.dataset.action;
//   getMoviesDetails(id).then(movie => openModalCard(movie));
// }

// async function renderMovieList(page = 1) {
//   search.params.params.page = page;
//   const listOfMovies = await searchMovies(search.params);

//   if (!listOfMovies?.data?.results?.length) {
//     Notiflix.Notify.warning(
//       'Sorry, there is no result. Please try another keyword'
//     );
//     return;
//   }

//   await changeGenresIdtoName(listOfMovies.data.results);

//   refs.mainList.innerHTML = createMarkUp(listOfMovies.data.results);
//   createPagination(page, listOfMovies.data.total_pages);
//   document
//     .querySelectorAll('[data-modal-open]')
//     .forEach(card => card.addEventListener('click', onFilmCardClick));
// }

// function onPaginationBtnClick(e) {
//   if (!e.target.dataset.page) return;
//   window.scrollTo({
//     top: 0,
//     left: 0,
//   });
//   renderMovieList(Number(e.target.dataset.page));
// }
