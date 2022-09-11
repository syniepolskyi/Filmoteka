import { renderMovieList } from '../renderMovieList';

export function onPaginationBtnClick(e) {
  if (!e.target.dataset.page) return;
  window.scrollTo({
    top: 0,
    left: 0,
  });
  renderMovieList(Number(e.target.dataset.page));
}
