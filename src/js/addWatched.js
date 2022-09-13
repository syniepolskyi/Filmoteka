import { dynRefs } from './constants/dynamicRefs';
import { STORAGE } from './constants/storage';
import { refs } from './constants/refs';
import { onFilmCardClick } from './onFilmCardClick';
import { localStorageAPI } from './localStorageAPI';

import { postData, auth } from './api/firebase/api';
import { removeFromLibraryList, addToLibrary } from './helpers/library-main';

const { headerWatchedBtn, mainList } = refs;

const buttonLabelWatchedAdd = 'Add to watched';
const buttonLabelWatchedRemove = 'Remove from watched';
const buttonLabelQueuedAdd = 'Add to queue';

// Додає або видаляє фільм з localStorage в залежності від стану кнопки

export async function addWatched(e) {
  let loadStorage;
  let userStorage;
  if (auth.currentUser) {
    userStorage = 'dataFromDB';
    loadStorage = JSON.parse(localStorage.getItem('dataFromDB'));
  } else {
    userStorage = STORAGE;
    loadStorage = localStorageAPI.load(STORAGE);
  }
  const { watched, queue } = loadStorage;
  const { addToWatchedBtn, addToQueueBtn } = dynRefs();
  const id = e.currentTarget.dataset.id;
  const btnCondition = e.target.getAttribute('data-btn');
  const indexOfWatchedMovie = watched.indexOf(id);
  const indexOfQueuedMovie = queue.indexOf(id);

  if (btnCondition === 'remove') {
    watched.splice(indexOfWatchedMovie, 1);

    if (auth.currentUser) {
      try {
        await postData(loadStorage);
      } catch (error) {
        console.log(error);
      }
    }
    localStorageAPI.save(userStorage, loadStorage);
    // remove from library
    if (
      refs.libBtn &&
      headerWatchedBtn.classList.contains('button--accent')
    ) {
      removeFromLibraryList(id);
    }

    e.target.setAttribute('data-btn', 'add');
    e.target.textContent = buttonLabelWatchedAdd;
    return;
  }

  watched.push(id);

  if (
    refs.libBtn &&
    headerWatchedBtn.classList.contains('button--accent')
  ) {
    try {
      await addToLibrary(id);
      document
        .querySelector(`[data-action='${id}']`)
        .addEventListener('click', onFilmCardClick);
    } catch (error) {}
  }

  if (indexOfQueuedMovie > -1) {
    queue.splice(indexOfQueuedMovie, 1);
    addToQueueBtn.setAttribute('data-btn', 'add');
    addToQueueBtn.textContent = buttonLabelQueuedAdd;

    if (
      refs.libBtn &&
      !headerWatchedBtn.classList.contains('button--accent')
    ) {
      removeFromLibraryList(id);
    }
  }
  if (auth.currentUser) {
    try {
      await postData(loadStorage);
    } catch (error) {
      console.log(error);
    }
  }
  localStorageAPI.save(userStorage, loadStorage);

  e.target.setAttribute('data-btn', 'remove');
  e.target.textContent = buttonLabelWatchedRemove;
}
