import './js/features/about-us/modalAbout';
import './js/features/upToTop/upToTop';
import './js/features/theme-switcher/theme-switcher';
import './js/features/trend-slider/slider-trends';
import './js/features/auth/authModalWindowContent';
import './js/helpers/helpers';
import { renderMovieList } from './js/renderMovieList';

import { refs } from './js/constants/refs';

import { renderTrendingMoviesSetup } from './js/renderMovieList';
import { onSearchFormSubmit } from './js/onSearchFormSubmit';
import { onPaginationBtnClick } from './js/pagination/onPaginationBtnClick';

import { authObserver } from './js/api/firebase/api';
import {
  showAuthorisedFields,
  showUnauthorisedFields,
} from './js/features/auth/authModalWindowContent';
import { search } from './js/api/moviedb/searchMovies';

authObserver([showAuthorisedFields], [showUnauthorisedFields]);

renderTrendingMoviesSetup();
refs.paginationBox.addEventListener('click', e => {
  search.pagination = true;
  onPaginationBtnClick(e.target, renderMovieList);
});
refs.headerForm.addEventListener('submit', onSearchFormSubmit);
