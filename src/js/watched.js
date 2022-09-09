// imports
import { getMoviesDetails } from "./api/moviedb/getMoviesDetails";
import createMarkUp from '../templates/film-cards.hbs';
import { refs } from "./constants/refs";
import { storage, STORAGE, ANON_WATCHED, ANON_QUEUE, localStorageAPI } from "./constants/storage";

// references
const { headerWatchedBtn, headerQueueBtn, mainList } = refs;

// variables
const bodyWidth = document.body.clientWidth;
let watchedPage = 1;

// preorders
storage[ANON_WATCHED] = ["154", "584", "1254", "154", "584", "1254", "154", "584", "1254", "154", "584", "1254"];
localStorageAPI.save(STORAGE, storage);

// event listeners
headerWatchedBtn.addEventListener('click', onClickWatched)
headerQueueBtn.addEventListener('click', onClickQueue)

// event listeners functions
function onClickQueue() {
  watchedPage = 1;

  if ( !headerQueueBtn.classList.contains("button--accent")) {
    headerQueueBtn.classList.add("button--accent");
  }
  if ( headerWatchedBtn.classList.contains("button--accent")) {
    headerWatchedBtn.classList.remove("button--accent");
  }
}

function onClickWatched() {
  watchedPage = 1;

  if ( !headerWatchedBtn.classList.contains("button--accent")) {
    headerWatchedBtn.classList.add("button--accent");
  }
  if ( headerQueueBtn.classList.contains("button--accent")) {
    headerQueueBtn.classList.remove("button--accent");
  }
  
  if (localStorageAPI.load(STORAGE)) {
    renderWatchedMarkup(watchedPage)
  } else {
    renderEmptyWatched()
  }
}

// functions helpers
async function renderWatchedMarkup(page) {
  const markup = await createWatchedMarkup(page);

  if (markup) {
    mainList.innerHTML = markup;
  } else {
    renderEmptyWatched();
  }
}

function renderEmptyWatched() {
  mainList.innerHTML = "Nothing wathed yet";
}

async function createWatchedMarkup(page) {
  const filteredWatchedArr = filterWatchedArr(page);

  if (filteredWatchedArr.length === 0) {
    return null;
  }

  const moviePromises = filteredWatchedArr.map(el => {
    const movie = getMoviesDetails(el);
    return movie;
  })

  try {
    const movies = await Promise.all(moviePromises);
    return createMarkUp(movies);
  } catch (e) {
    console.log(e.message);
  }
}

function filterWatchedArr(page) {
  const filterNumber = choiseFilterNumber(bodyWidth);
  const watchedArr = localStorageAPI.load(STORAGE)[ANON_WATCHED];

  return watchedArr.filter((value, index) => {
    if (index >= filterNumber * (page - 1) && index < filterNumber * page) {
      return value;
    }
  })
}

function choiseFilterNumber(screenWidth) {
  if (screenWidth >= 1280) {
    return 9;
  } else if (screenWidth < 768) {
    return 4;
  }
  return 8;
}
