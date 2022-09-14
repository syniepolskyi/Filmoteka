// imports
import { getMoviesDetails } from "../api/moviedb/getMoviesDetails";
import createMarkUp from '../../templates/film-cards.hbs';
import { refs } from "../constants/refs";
import { 
  STORAGE, 
  ANON_WATCHED, 
  ANON_QUEUE,
  DB_STORAGE, 
  ACCENT_BTN_CLASS 
} from "../constants/app_const";
import { createPagination } from '../pagination/createPagination';
import { onFilmCardClick } from '../onFilmCardClick';
import { localStorageAPI } from '../localStorageAPI';
import { auth } from '../api/firebase/firebaseConfig';
import { dynRefs } from '../constants/dynamicRefs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.5.min.css";


// references
const { headerWatchedBtn, headerQueueBtn, mainList, dataNotFoundEl, paginationBox } = refs;

// variables
const perPage = choisePerPage(document.body.clientWidth);
let libraryQuery = ANON_WATCHED;




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
function renderLibraryMainContent(page = 1) {
  let data = localStorageAPI.load(STORAGE);
  if(auth.currentUser && localStorageAPI.load(DB_STORAGE)){
    data = localStorageAPI.load(DB_STORAGE);
  }
  if (data) {
    renderLibraryCards(page);
  } else {
    renderEmptyLibrary();
  }
}

async function renderLibraryCards(page) {
  const markup = await createLibraryCardsdMarkup(page);

  if (markup) {
    clearDataNotFoundEl();
    mainList.innerHTML = markup;

    // pagination
    let arr = localStorageAPI.load(STORAGE)[libraryQuery];
    if(auth.currentUser && localStorageAPI.load(DB_STORAGE)){
      arr = localStorageAPI.load(DB_STORAGE)[libraryQuery];
    }
    const totalPages = Math.ceil(arr.length / perPage);
    createPagination(page, totalPages);

    // event listeners
    dynRefs().movieElements
    .forEach(card => card.addEventListener('click', onFilmCardClick));
  } else {
    renderEmptyLibrary();
  }
}

function renderEmptyLibrary() {
  clearLibraryCards();
  clearPagination();
  if (libraryQuery === ANON_WATCHED) {
    dataNotFoundEl.innerHTML = `<p class="not-film-card">Nothing watched yet</p>`;
    return
  }
  if (libraryQuery === ANON_QUEUE) {
    dataNotFoundEl.innerHTML = `<p class="not-film-card">Nothing in queue yet</p>`;
    return
  }
}

async function createLibraryCardsdMarkup(page) {
  const filteredCardsArr = filterCardsArr(page);

  if (filteredCardsArr.length === 0) {
    return null;
  }

  const moviePromises = filteredCardsArr.map(el => {
    const movie = getMoviesDetails(el);
    return movie;
  })

  try {
    const movies = await Promise.all(moviePromises);
    return createMarkUp(movies);
  } catch (e) {
    Notify.failure("Something went wrong");
  }
}

function filterCardsArr(page) {
  const cardsArr = getLocalStorageFilms();

  return cardsArr.filter((value, index) => {
    if (index >= perPage * (page - 1) && index < perPage * page) {
      return value;
    }
  })
}

function getLocalStorageFilms() {
  if(auth.currentUser && localStorageAPI.load(DB_STORAGE)){
    return localStorageAPI.load(DB_STORAGE)[libraryQuery];
  }
  return localStorageAPI.load(STORAGE)[libraryQuery];
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
  if ( !headerWatchedBtn.classList.contains(ACCENT_BTN_CLASS)) {
    headerWatchedBtn.classList.add(ACCENT_BTN_CLASS);
    headerQueueBtn.classList.remove(ACCENT_BTN_CLASS);
  }
}

function accentQueueBtn() {
  if ( !headerQueueBtn.classList.contains(ACCENT_BTN_CLASS)) {
    headerQueueBtn.classList.add(ACCENT_BTN_CLASS);
    headerWatchedBtn.classList.remove(ACCENT_BTN_CLASS);
  }
}

function clearPagination() {
  paginationBox.innerHTML = '';
}

function clearDataNotFoundEl() {
  dataNotFoundEl.innerHTML = '';
}

function clearLibraryCards() {
  mainList.innerHTML = '';
}


//authObserver(getUsersFilms, getLocalStorageFilms);

function removeFromLibraryList(id) {
  const activeFilm = dynRefs(id).activeFilm;
  activeFilm.remove();
}
async function addToLibrary(id) {
  try {
    let movieTopush = [];
    const movie = await getMoviesDetails(id);
    movieTopush.push(movie);
    mainList.insertAdjacentHTML('afterbegin', createMarkUp(movieTopush));

    return;
  } catch (error) {
    Notify.failure("Something went wrong");
  }
}

// exports
export { 
  renderLibraryMainContent, 
  removeFromLibraryList, 
  addToLibrary,
  onClickQueue,
  onClickWatched
};