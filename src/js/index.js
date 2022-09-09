import './constants/refs';
import './api/moviedb/getTrending';
import './api/moviedb/searchMovies';
import './modalCard';
import './modalAbout';
import './upToTop';

import { getTrending } from './api/moviedb/getTrending';
import { getGenres } from './api/moviedb/getGenres';
import { changeGenresIdtoName } from './api/moviedb/changeGenresIdtoName';
import { searchMovies } from './api/moviedb/searchMovies';
import createMarkUp from '../templates/film-cards.hbs';
import { refs } from './constants/refs';
import Notiflix from 'notiflix';

let page = 1;
let nameForSrc = '';

async function renderTrendingMovies(page) {
  try {
    const listOfMovies = await getTrending(page);
    const genres = await getGenres();
    changeGenresIdtoName(listOfMovies.results, genres);
    // console.log(listOfMovies.results);

    refs.mainList.innerHTML = createMarkUp(listOfMovies.results);
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}

renderTrendingMovies();

const searchForm = document.querySelector('.header__form');
searchForm.addEventListener('submit', renderKeywordSearchMovies);

async function renderKeywordSearchMovies(name) {

  try {
    name.preventDefault();
    nameForSrc = name.target.serch_film.value.trim();

    if (!nameForSrc) {
      Notiflix.Notify.warning("Searching starts after providing data to search.")
    }
    else {
      const resultOfSearching = await searchMovies(nameForSrc, page);
      console.log(resultOfSearching);
      const genres = await getGenres();
      changeGenresIdtoName(resultOfSearching.results, genres);
      refs.mainList.innerHTML = createMarkUp(resultOfSearching.results);

    }
  }
  catch (error) {
    // Повідомлення для користувача не виведено (помилка тільки в консолі), бо якщо не завантажується постер, а лише заглушка - спливають по черзі повідомлення error
  console.log(error.message);
  }
}



