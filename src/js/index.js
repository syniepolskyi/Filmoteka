// import './constants/refs';
import './api/moviedb/getTrending';
import './api/moviedb/searchMovies';
import './queue';
import './watched';
import './modalCard';
import './modalAbout';
import './upToTop';
import { getTrending } from './api/moviedb/getTrending';
import { getGenres } from './api/moviedb/getGenres';
import { changeGenresIdtoName } from './api/moviedb/changeGenresIdtoName';
import createMarkUp from '../templates/film-cards.hbs';
import { refs } from './constants/refs';
import Notiflix from 'notiflix';

let page = 1;

async function renderTrendingMovies(page) {
  try {
    const listOfMovies = await getTrending(page);
    const genres = await getGenres();
    changeGenresIdtoName(listOfMovies.results, genres);
    console.log(listOfMovies.results);

    refs.mainList.innerHTML = createMarkUp(listOfMovies.results);
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}

renderTrendingMovies();
