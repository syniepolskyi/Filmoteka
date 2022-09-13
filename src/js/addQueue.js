import { dynRefs } from './constants/dynamicRefs';
import { STORAGE, localStorageAPI } from './constants/storage';
import { getMoviesDetails } from './api/moviedb/getMoviesDetails';
import createMarkUp from '../templates/film-cards.hbs';
import { refs } from './constants/refs';
import { onFilmCardClick } from './onFilmCardClick';

const { headerWatchedBtn, headerQueueBtn, mainList } = refs;

const buttonLabelQueuedAdd = 'Add to queue';
const buttonLabelQueuedRemove = 'Remove from queue';
const buttonLabelWatchedAdd = 'Add to watched';

// Додає або видаляє фільм з localStorage в залежності від стану кнопки

export async function addQueue(e) {
  const { addToWatchedBtn, addToQueueBtn } = dynRefs();
  const loadStorage = localStorageAPI.load(STORAGE);
  const { watched, queue } = loadStorage;
  const id = e.currentTarget.dataset.id;
  const btnCondition = e.target.getAttribute('data-btn');
  const indexOfWatchedMovie = watched.indexOf(id);
  const indexOfQueuedMovie = queue.indexOf(id);

  if (btnCondition === 'remove') {
    queue.splice(indexOfQueuedMovie, 1);

    localStorageAPI.save(STORAGE, loadStorage);

    if (
      document.querySelector('.library__btns') &&
      headerQueueBtn.classList.contains('button--accent')
    ) {
      removeFromLibraryList(id);
    }

    e.target.setAttribute('data-btn', 'add');
    e.target.textContent = buttonLabelQueuedAdd;
    return;
  }

  queue.push(id);

  if (
    document.querySelector('.library__btns') &&
    headerQueueBtn.classList.contains('button--accent')
  ) {
    try {
      await addToLibrary(id);
      document
        .querySelector(`[data-action='${id}']`)
        .addEventListener('click', onFilmCardClick);
    } catch (error) {}
  }

  if (indexOfWatchedMovie > -1) {
    watched.splice(indexOfWatchedMovie, 1);
    addToWatchedBtn.setAttribute('data-btn', 'add');
    addToWatchedBtn.textContent = buttonLabelWatchedAdd;

    if (
      document.querySelector('.library__btns') &&
      !headerQueueBtn.classList.contains('button--accent')
    ) {
      removeFromLibraryList(id);
    }
  }

  localStorageAPI.save(STORAGE, loadStorage);

  e.target.setAttribute('data-btn', 'remove');
  e.target.textContent = buttonLabelQueuedRemove;
}
function removeFromLibraryList(id) {
  const activeFilm = document.querySelector(`[data-action='${id}']`);
  activeFilm.remove();
}
async function addToLibrary(id) {
  try {
    let movieTopush = [];
    const movie = await getMoviesDetails(id);
    movieTopush.push(movie);
    mainList.insertAdjacentHTML('afterbegin', createMarkUp(movieTopush));

    return;
  } catch (error) {}
}
