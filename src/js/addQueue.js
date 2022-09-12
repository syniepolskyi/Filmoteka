import { dynRefs } from './constants/dynamicRefs';
import { STORAGE, localStorageAPI } from './constants/storage';

const buttonLabelQueuedAdd = 'Add to queue';
const buttonLabelQueuedRemove = 'Remove from queue';
const buttonLabelWatchedAdd = 'Add to watched';

// Додає або видаляє фільм з localStorage в залежності від стану кнопки

export function addQueue(e) {
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

    e.target.setAttribute('data-btn', 'add');
    e.target.textContent = buttonLabelQueuedAdd;
    return;
  }

  queue.push(id);

  if (indexOfWatchedMovie > -1) {
    watched.splice(indexOfWatchedMovie, 1);
    addToWatchedBtn.setAttribute('data-btn', 'add');
    addToWatchedBtn.textContent = buttonLabelWatchedAdd;
  }

  localStorageAPI.save(STORAGE, loadStorage);

  e.target.setAttribute('data-btn', 'remove');
  e.target.textContent = buttonLabelQueuedRemove;
}
