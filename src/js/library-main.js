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
renderLibraryMainContent(1);

// event listeners
headerWatchedBtn.addEventListener('click', onClickWatched);
headerQueueBtn.addEventListener('click', onClickQueue);

// event listeners functions
function onClickWatched() {
  accentWatchedBtn();

  libraryQuery = ANON_WATCHED;

  renderLibraryMainContent(1);
}

function onClickQueue() {
  accentQueueBtn();

  libraryQuery = ANON_QUEUE;

  renderLibraryMainContent(1);
}

// functions helpers
function renderLibraryMainContent(page) {
  if (localStorageAPI.load(STORAGE)) {
    renderLibraryCards(page);
  } else {
    renderEmptyLibrary();
  }
}

async function renderLibraryCards(page) {
  const markup = await createLibraryCardsdMarkup(page);

  if (markup) {
    mainList.innerHTML = markup;
    // place for pagination function and add event listeners to film's cards
    // pagination
    const arr = localStorageAPI.load(STORAGE)[libraryQuery];
    const totalPages = Math.ceil(arr.length / perPage);
    createPagination(page, totalPages);
    // event listeners
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
    refs.paginationBox.innerHTML = '';
    return;
  }
  if (libraryQuery === ANON_QUEUE) {
    mainList.innerHTML = 'Nothing in queue yet';
    refs.paginationBox.innerHTML = '';
    return;
  }
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

function accentWatchedBtn() {
  if (!headerWatchedBtn.classList.contains(ACCENT_BTN_CLASS)) {
    headerWatchedBtn.classList.add(ACCENT_BTN_CLASS);
    headerQueueBtn.classList.remove(ACCENT_BTN_CLASS);
  }
}

function accentQueueBtn() {
  if (!headerQueueBtn.classList.contains(ACCENT_BTN_CLASS)) {
    headerQueueBtn.classList.add(ACCENT_BTN_CLASS);
    headerWatchedBtn.classList.remove(ACCENT_BTN_CLASS);
  }
}

// exports
export { renderLibraryMainContent };
