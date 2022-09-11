import './constants/refs';
import './api/moviedb/getTrending';
import './api/moviedb/searchMovies';
import './modalAbout';
import './features/upToTop/upToTop';
import './features/trend-slider/slider-trends';
import './features/auth/auth';
import './helpers';

import { refs } from './constants/refs';

import Handlebars from 'handlebars';

import { renderTrendingMoviesSetup } from './renderMovieList';
import { onSearchFormSubmit } from './onSearchFormSubmit';
import { onPaginationBtnClick } from './pagination/onPaginationBtnClick';

renderTrendingMoviesSetup();
refs.paginationBox.addEventListener('click', onPaginationBtnClick);
refs.headerForm.addEventListener('submit', onSearchFormSubmit);
