import { refs } from './constants/refs';
import { renderLibraryMainContent } from './library-main';
import './modalCard';
import './modalAbout';
import './features/upToTop/upToTop';
import './features/auth/authModalWindowContent';
import { authObserver } from './api/firebase/api';
import {
  showAuthorisedFields,
  showUnauthorisedFields,
} from './features/auth/authModalWindowContent';

authObserver([showAuthorisedFields], [showUnauthorisedFields]);
renderLibraryMainContent(1);

refs.paginationBox.addEventListener('click', e => {
  if (!e.target.dataset.page) return;
  renderLibraryMainContent(+e.target.dataset.page);
});

import './features/theme-switcher/theme-switcher';
