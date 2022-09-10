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

let page = 1;
let nameForSrc = '';

async function renderTrendingMovies(page = 1) {
  try {
    const listOfMovies = await getTrending(page);
    const _genres = await genres();
    changeGenresIdtoName(listOfMovies.results, _genres);

    refs.mainList.innerHTML = createMarkUp(listOfMovies.results);
    createPagination(page, listOfMovies.total_pages);
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
  try {
    name.preventDefault();
    clearPage();
    nameForSrc = name.target.serch_film.value.trim();

    if (!nameForSrc) {
      Notiflix.Notify.warning(
        'Searching starts after providing data to search.'
      );
    } else {
      const resultOfSearching = await searchMovies(nameForSrc, page);
      console.log(resultOfSearching);

      if (resultOfSearching.results.length === 0) {
        Notiflix.Notify.warning(
          'Sorry, there is no result. Please try another keyword'
        );
      } else {
        const _genres = await genres();
        changeGenresIdtoName(resultOfSearching.results, _genres);
        refs.mainList.innerHTML = createMarkUp(resultOfSearching.results);
      }
    }
  } catch (error) {
    // Повідомлення для користувача не виведено (помилка тільки в консолі), бо якщо не завантажується постер, а лише заглушка - спливають по черзі повідомлення error
    console.log(error.message);
  }
}

function onFilmCardClick() {
  const id = this.dataset.action;
  getMoviesDetails(id).then(movie => openModalCard(movie));
}

function clearPage() {
  page = 1;
  refs.mainList.innerHTML = '';
}

function onPaginationBtnClick(e) {
  window.scrollTo({
    top: 0,
    left: 0,
  });
  renderTrendingMovies(Number(e.target.dataset.page));
}
