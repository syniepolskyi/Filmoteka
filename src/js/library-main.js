// imports
import { getMoviesDetails } from './api/moviedb/getMoviesDetails';
import createMarkUp from '../templates/film-cards.hbs';
import { refs } from './constants/refs';
import {
  storage,
  STORAGE,
  ANON_WATCHED,
  ANON_QUEUE,
  localStorageAPI,
} from './constants/storage';
import { createPagination } from './pagination/createPagination';
import { onFilmCardClick } from './onFilmCardClick';

// references
const { headerWatchedBtn, headerQueueBtn, mainList } = refs;

// variables
const ACCENT_BTN_CLASS = 'button--accent';
const perPage = choisePerPage(document.body.clientWidth);
let libraryQuery = ANON_WATCHED;

// preorders
// storage[ANON_WATCHED] = [
//   '154',
//   '584',
//   '1254',
//   '154',
//   '584',
//   '1254',
//   '154',
//   '584',
//   '1254',
//   '154',
//   '584',
//   '1254',
// ];
// localStorageAPI.save(STORAGE, storage);

// event listeners
headerWatchedBtn.addEventListener('click', onClickWatched);
headerQueueBtn.addEventListener('click', onClickQueue);

// event listeners functions
function onClickWatched() {
  accentBtnToggle();

  libraryQuery = ANON_WATCHED;

  renderLibraryMainContent(1);
}

function onClickQueue() {
  accentBtnToggle(true);

  libraryQuery = ANON_QUEUE;

  renderLibraryMainContent(1);
}

// functions helpers
function renderLibraryMainContent(page) {
  if (localStorageAPI.load(STORAGE)) {
    renderLibraryCards(page);
  } else {
    renderEmptyLibrary();

    headerWatchedBtn.classList.toggle('button--accent');

    /*
    if (!headerWatchedBtn.classList.contains('button--accent')) {
      headerWatchedBtn.classList.add('button--accent');
    }
    if (headerQueueBtn.classList.contains('button--accent')) {
      headerQueueBtn.classList.remove('button--accent');
    }
    */

    if (localStorageAPI.load(STORAGE)) {
      renderWatchedMarkup(watchedPage);
    } else {
      renderEmptyWatched();
    }
  }
}

async function renderLibraryCards(page) {
  const markup = await createLibraryCardsdMarkup(page);

  if (markup) {
    mainList.innerHTML = markup;
    // place for pagination function
    
    const arr = localStorageAPI.load(STORAGE)[libraryQuery];
    const totalPages = arr.length;
    // <== renderPagination(page, totalPages) ==>
    createPagination(page, Math.ceil(arr.length / perPage));
    document
      .querySelectorAll('[data-modal-open]')
      .forEach(card => card.addEventListener('click', onFilmCardClick));
  } else {
    renderEmptyLibrary();
  }
}

function renderEmptyLibrary() {
  if (libraryQuery === ANON_WATCHED) {
    mainList.innerHTML = 'Nothing wathed yet';
    return;
  }
  if (libraryQuery === ANON_QUEUE) {
    mainList.innerHTML = 'Nothing in queue yet';
    return;
  }
}

function renderEmptyWatched() {
  mainList.innerHTML = 'Nothing wathed yet';
}

async function createLibraryCardsdMarkup(page) {
  const filteredCardsArr = filterCardsdArr(page);

  if (filteredCardsArr.length === 0) {
    return null;
  }

  const moviePromises = filteredCardsArr.map(el => {
    const movie = getMoviesDetails(el);
    return movie;
  });

  try {
    const movies = await Promise.all(moviePromises);
    return createMarkUp(movies);
  } catch (e) {
    console.log(e.message);
  }
}

function filterCardsdArr(page) {
  const cardsArr = localStorageAPI.load(STORAGE)[libraryQuery];

  return cardsArr.filter((value, index) => {
    if (index >= perPage * (page - 1) && index < perPage * page) {
      return value;
    }
  });
}

function choisePerPage(screenWidth) {
  if (screenWidth >= 1280) {
    return 9;
  }
  if (screenWidth < 768) {
    return 4;
  }
  return 8;
}

function accentBtnToggle(p = false) {
  headerWatchedBtn.classList.toggle(ACCENT_BTN_CLASS, !p);
  headerQueueBtn.classList.toggle(ACCENT_BTN_CLASS,p);
}

// exports
export { renderLibraryMainContent };
