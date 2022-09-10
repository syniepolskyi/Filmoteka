import './constants/refs';
import './api/moviedb/getTrending';
import './api/moviedb/searchMovies';
import openModalCard from './modalCard';
import './modalAbout';
import './upToTop';

import { getTrending } from './api/moviedb/getTrending';
import { genres } from './api/moviedb/getGenres';
import { changeGenresIdtoName } from './api/moviedb/changeGenresIdtoName';
import { searchMovies } from './api/moviedb/searchMovies';
import createMarkUp from '../templates/film-cards.hbs';
import { refs } from './constants/refs';
import Notiflix from 'notiflix';
import { createPagination } from './createPagination';

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
  postData(usersFilms);
});

btnToRequest.addEventListener('click', async () => {
  a = await getData();
  console.log(a);
});

import openModalCard from './modalCard';
import { getMoviesDetails } from './api/moviedb/getMoviesDetails';
import { async } from '@firebase/util';

let nameForSrc = '';

async function renderTrendingMovies(page = 1) {
  const status = 'trends';
  try {
    const listOfMovies = await getTrending(page);

    await changeGenresIdtoName(listOfMovies.results);

    refs.mainList.innerHTML = createMarkUp(listOfMovies.results);
    createPagination(page, listOfMovies.total_pages, status);
    document
      .querySelectorAll('[data-modal-open]')
      .forEach(card => card.addEventListener('click', onFilmCardClick));
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}

renderTrendingMovies();
refs.paginationBox.addEventListener('click', onPaginationBtnClick);

refs.headerForm.addEventListener('submit', renderKeywordSearchMovies);

async function renderKeywordSearchMovies(name) {
  name.preventDefault();

  nameForSrc = name.target.serch_film.value.trim();
  if (!nameForSrc) {
    Notiflix.Notify.warning('Searching starts after providing data to search.');
    return;
  }

  renderSearchList(nameForSrc);
}

async function renderSearchList(nameForSrc, page = 1) {
  const status = 'search';
  const resultOfSearching = await searchMovies(nameForSrc, page);

  console.log(resultOfSearching.data);

  if (!resultOfSearching.data.results.length) {
    Notiflix.Notify.warning(
      'Sorry, there is no result. Please try another keyword'
    );
    return;
  }
  await changeGenresIdtoName(resultOfSearching.data.results);
  refs.mainList.innerHTML = createMarkUp(resultOfSearching.data.results);
  createPagination(page, resultOfSearching.data.total_pages, status);
}

function onFilmCardClick() {
  const id = this.dataset.action;
  getMoviesDetails(id).then(movie => openModalCard(movie));
}

function onPaginationBtnClick(e) {
  if (!e.target.dataset.page) return;
  window.scrollTo({
    top: 0,
    left: 0,
  });
  if (e.target.dataset.status == 'trends')
    renderTrendingMovies(Number(e.target.dataset.page));
  if (e.target.dataset.status == 'search')
    renderSearchList(nameForSrc, Number(e.target.dataset.page));
}
