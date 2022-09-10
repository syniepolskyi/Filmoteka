import { dynRefs } from './constants/dynamicRefs';
import {
  storage,
  STORAGE,
  ANON_WATCHED,
  ANON_QUEUE,
  localStorageAPI,
} from './constants/storage';
localStorageAPI.save(STORAGE, storage);

export function addQueue(movie) {
  let queBtn = dynRefs().addToQueueBtn;

  queBtn.addEventListener('click', () => {
    setLocalStorege(movie);
  });
}

function setLocalStorege(movie) {
  const loadStore = localStorageAPI.load(STORAGE);
  loadStore[ANON_QUEUE].push(movie.id);
  localStorageAPI.save(STORAGE, loadStore);
}
