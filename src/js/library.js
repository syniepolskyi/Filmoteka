import { refs } from './constants/refs';
import { 
  renderLibraryMainContent, 
  onClickWatched,
  onClickQueue
} from './helpers/library-main';
import './modalCard';
import './modalAbout';
import './features/upToTop/upToTop';
import './features/auth/authModalWindowContent';
import { authObserver } from './api/firebase/api';
import {
  showAuthorisedFields,
  showUnauthorisedFields,
} from './features/auth/authModalWindowContent';

authObserver(
  [showAuthorisedFields, renderLibraryMainContent], 
  [showUnauthorisedFields, renderLibraryMainContent]);


refs.paginationBox.addEventListener('click', e => {
  if (!e.target.dataset.page) return;
  window.scrollTo({
    top: 0,
    left: 0,
  });
  renderLibraryMainContent(+e.target.dataset.page);
});

// event listeners
refs.headerWatchedBtn.addEventListener('click', onClickWatched);
refs.headerQueueBtn.addEventListener('click', onClickQueue);

import './features/theme-switcher/theme-switcher';
