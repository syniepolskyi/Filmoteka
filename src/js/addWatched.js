import { dynRefs } from './constants/dynamicRefs';
import {
  storage,
  STORAGE,
  ANON_WATCHED,
  ANON_QUEUE,
  localStorageAPI,
} from './constants/storage';

const buttonLabelWatchedAdd = 'Add to watched';
const buttonLabelWatchedRemove = 'Remove from watched';
const buttonLabelQueuedAdd = 'Add to queue';
const buttonLabelQueueRemove = 'Remove from queue';

let loadStorage = localStorageAPI.load(STORAGE);

const wtchBtn = dynRefs().addToWatchedBtn;
const queBtn = dynRefs().addToQueueBtn;

export function btnWtcActivity(e) {
  const idHolder = document
    .querySelector('.modal-card__img')
    .getAttribute('data-id');

  let btnCond = e.target.getAttribute('data-btn');

  if (btnCond === 'remove') {
    removeFromStorage(idHolder);
    e.target.setAttribute('data-btn', 'add');
    e.target.textContent = buttonLabelWatchedAdd;

    return;
  }
  addWatched(idHolder);
  e.target.setAttribute('data-btn', 'remove');

  e.target.textContent = buttonLabelWatchedRemove;
}

function addWatched(id) {
  loadStorage = storage;
  loadStorage[ANON_WATCHED].push(id);
  const queBtn = dynRefs().addToQueueBtn;
  const queueArr = loadStorage[ANON_QUEUE];
  const indexOfMovie = queueArr.indexOf(id).toString();
  queueArr.splice(indexOfMovie, 1);
  queBtn.setAttribute('data-btn', 'add');
  queBtn.textContent = buttonLabelQueuedAdd;

  localStorageAPI.save(STORAGE, loadStorage);
}

function removeFromStorage(id) {
  const watchedArr = loadStorage[ANON_WATCHED];
  const indexOfMovie = watchedArr.indexOf(id).toString();
  watchedArr.splice(indexOfMovie, 1);

  localStorageAPI.save(STORAGE, loadStorage);
}

export function checkStorege(id) {
  const wtchBtn = dynRefs().addToWatchedBtn;
  const queBtn = dynRefs().addToQueueBtn;

  if (!loadStorage) {
    return;
  }

  const watchedArr = loadStorage[ANON_WATCHED];
  const queueArr = loadStorage[ANON_QUEUE];
  const idStr = id.toString();
  const indexOfWarchedMovie = watchedArr.indexOf(idStr);
  const indexOfQueueMovie = queueArr.indexOf(idStr);

  if (indexOfWarchedMovie > -1) {
    wtchBtn.setAttribute('data-btn', 'remove');
    wtchBtn.textContent = buttonLabelWatchedRemove;
  }

  if (indexOfQueueMovie > -1) {
    queBtn.setAttribute('data-btn', 'remove');
    queBtn.textContent = buttonLabelQueueRemove;
  }
}
