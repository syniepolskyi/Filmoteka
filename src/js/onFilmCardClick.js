import { getMoviesDetails } from './api/moviedb/getMoviesDetails';
import openModalCard from './modalCard';

export function onFilmCardClick() {
  const id = this.dataset.action;
  getMoviesDetails(id).then(movie => openModalCard(movie));
}
