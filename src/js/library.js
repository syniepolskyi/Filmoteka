import { refs } from './constants/refs';
import {
  renderLibraryMainContent,
  onClickWatched,
  onClickQueue,
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
import { onPaginationBtnClick } from './pagination/onPaginationBtnClick';
onPaginationBtnClick;

authObserver(
  [showAuthorisedFields, renderLibraryMainContent],
  [showUnauthorisedFields, renderLibraryMainContent]
);

refs.paginationBox.addEventListener('click', e => {
  onPaginationBtnClick(e.target, renderLibraryMainContent);
});

// event listeners
refs.headerWatchedBtn.addEventListener('click', onClickWatched);
refs.headerQueueBtn.addEventListener('click', onClickQueue);

import './features/theme-switcher/theme-switcher';
