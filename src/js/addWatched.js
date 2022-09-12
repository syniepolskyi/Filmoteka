import { dynRefs } from './constants/dynamicRefs';
import { STORAGE, localStorageAPI } from './constants/storage';

const buttonLabelWatchedAdd = 'Add to watched';
const buttonLabelWatchedRemove = 'Remove from watched';
const buttonLabelQueuedAdd = 'Add to queue';

// Додає або видаляє фільм з localStorage в залежності від стану кнопки

export function addWatched(e) {
  const { addToWatchedBtn, addToQueueBtn } = dynRefs();
  const loadStorage = localStorageAPI.load(STORAGE);
  const { watched, queue } = loadStorage;
  const id = e.currentTarget.dataset.id;
  const btnCondition = e.target.getAttribute('data-btn');
  const indexOfWatchedMovie = watched.indexOf(id);
  const indexOfQueuedMovie = queue.indexOf(id);

  if (btnCondition === 'remove') {
    watched.splice(indexOfWatchedMovie, 1);

    localStorageAPI.save(STORAGE, loadStorage);

    e.target.setAttribute('data-btn', 'add');
    e.target.textContent = buttonLabelWatchedAdd;
    return;
  }

  watched.push(id);

  if (indexOfQueuedMovie > -1) {
    queue.splice(indexOfQueuedMovie, 1);
    addToQueueBtn.setAttribute('data-btn', 'add');
    addToQueueBtn.textContent = buttonLabelQueuedAdd;
  }

  localStorageAPI.save(STORAGE, loadStorage);

  e.target.setAttribute('data-btn', 'remove');
  e.target.textContent = buttonLabelWatchedRemove;
}
