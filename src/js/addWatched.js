import { dynRefs } from './constants/dynamicRefs';
import {
  storage,
  STORAGE,
  ANON_WATCHED,
  ANON_QUEUE,
  localStorageAPI,
} from './constants/storage';

export function addWatched(movie) {
  let wtchBtn = dynRefs().addToWatchedBtn;

  wtchBtn.addEventListener('click', () => {
    setLocalStorege(movie);
  });
}

function setLocalStorege(movie) {
  const loadStore = localStorageAPI.load(STORAGE);
  if (!loadStore) {
    storage[ANON_WATCHED].push(movie.id);
    localStorageAPI.save(STORAGE, storage);
    return;
  }
  loadStore[ANON_WATCHED].push(movie.id);
  localStorageAPI.save(STORAGE, loadStore);
}
