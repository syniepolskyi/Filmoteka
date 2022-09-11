import { dynRefs } from './constants/dynamicRefs';
import {
  storage,
  STORAGE,
  ANON_WATCHED,
  ANON_QUEUE,
  localStorageAPI,
} from './constants/storage';

const buttonLabelQueueAdd = 'Add to queue';
const buttonLabelQueueRemove = 'Remove from queue';
const buttonLabelWatchedAdd = 'Add to watched';

let loadStorage = localStorageAPI.load(STORAGE);
const wtchBtn = dynRefs().addToWatchedBtn;
const queBtn = dynRefs().addToQueueBtn;

export function btnQueActivity(e) {
  const idHolder = document
    .querySelector('.film-list__item')
    .getAttribute('data-action');

  let btnCond = e.target.getAttribute('data-btn');

  if (btnCond === 'remove') {
    removeFromStorage(idHolder);
    e.target.setAttribute('data-btn', 'add');
    e.target.textContent = buttonLabelQueueAdd;

    return;
  }
  addQueue(idHolder);
  e.target.setAttribute('data-btn', 'remove');

  e.target.textContent = buttonLabelQueueRemove;
}

function addQueue(id) {
  loadStorage = storage;
  loadStorage[ANON_QUEUE].push(id);
  const wtchBtn = dynRefs().addToWatchedBtn;
  const watchedArr = loadStorage[ANON_WATCHED];
  const indexOfMovie = watchedArr.indexOf(id).toString();
  watchedArr.splice(indexOfMovie, 1);
  wtchBtn.setAttribute('data-btn', 'add');
  wtchBtn.textContent = buttonLabelWatchedAdd;

  localStorageAPI.save(STORAGE, loadStorage);
}

function removeFromStorage(id) {
  const queueArr = loadStorage[ANON_QUEUE];
  const indexOfMovie = queueArr.indexOf(id).toString();
  queueArr.splice(indexOfMovie, 1);

  localStorageAPI.save(STORAGE, loadStorage);
}
