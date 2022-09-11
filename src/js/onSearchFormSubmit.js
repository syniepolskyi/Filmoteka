import { Notify } from 'notiflix';
import { renderSearchListSetup } from './renderMovieList';

export function onSearchFormSubmit(name) {
  name.preventDefault();

  const nameForSrc = name.target.serch_film.value.trim();
  if (!nameForSrc) {
    Notify.warning('Searching starts after providing data to search.');
    return;
  }
  renderSearchListSetup(nameForSrc);
}
