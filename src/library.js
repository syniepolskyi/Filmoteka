import { refs } from './js/constants/refs';
import {
  renderLibraryMainContent,
  onClickWatched,
  onClickQueue,
} from './js/helpers/library-main';
import './js/modalCard';
import './js/features/about-us/modalAbout';
import './js/features/upToTop/upToTop';
import './js/features/auth/authModalWindowContent';
import { authObserver } from './js/api/firebase/api';
import {
  showAuthorisedFields,
  showUnauthorisedFields,
} from './js/features/auth/authModalWindowContent';
import { onPaginationBtnClick } from './js/pagination/onPaginationBtnClick';
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

import './js/features/theme-switcher/theme-switcher';
