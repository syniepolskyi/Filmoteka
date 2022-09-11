import './constants/refs';
import './api/moviedb/getTrending';
import './api/moviedb/searchMovies';
import './modalAbout';
import './features/upToTop/upToTop';
import './features/trend-slider/slider-trends';
import './features/auth/auth';

import { refs } from './constants/refs';

import Handlebars from 'handlebars';

import { renderTrendingMoviesSetup } from './renderMovieList';
import { onSearchFormSubmit } from './onSearchFormSubmit';
import { onPaginationBtnClick } from './pagination/onPaginationBtnClick';

renderTrendingMoviesSetup();
refs.paginationBox.addEventListener('click', onPaginationBtnClick);

// фіксять рік там рейтинг на картках фільмів
Handlebars.registerHelper('yearFixed', function (movieDate) {
  let today = new Date(movieDate);
  let year = today.getFullYear();
  return year;
});

refs.headerForm.addEventListener('submit', onSearchFormSubmit);
