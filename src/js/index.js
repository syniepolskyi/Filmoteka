import './constants/refs';
import './api/moviedb/getTrending';
import './api/moviedb/searchMovies';
import './modalAbout';
import './features/upToTop/upToTop';
import './features/trend-slider/slider-trends';
import './features/auth/auth';
import './helpers';

import { refs } from './constants/refs';

import { renderTrendingMoviesSetup } from './renderMovieList';
import { onSearchFormSubmit } from './onSearchFormSubmit';
import { onPaginationBtnClick } from './pagination/onPaginationBtnClick';

import { authObserver } from './api/firebase/api';
import {
  showAuthorisedFields,
  showUnauthorisedFields,
} from './features/auth/auth';

authObserver(showAuthorisedFields, showUnauthorisedFields);

renderTrendingMoviesSetup();
refs.paginationBox.addEventListener('click', onPaginationBtnClick);
refs.headerForm.addEventListener('submit', onSearchFormSubmit);
