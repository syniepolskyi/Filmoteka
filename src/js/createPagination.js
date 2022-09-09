import { refs } from './constants/refs';

export function createPagination(page = 1, totalPage = 1) {
  if (totalPage === 1) return;
  let paginationMurkup = '';
  const pageWidth = document.documentElement.scrollWidth;
  const arrowBtnLeft = `<button type="button" class="pagination_button pagination_button-arrow_left" data-arrow="-1"></button>`;
  const arrowBtnRight = `<button type="button" class="pagination_button pagination_button-arrow_right" data-arrow="1"></button>`;
  const firstBtn = `<button type="button" class="pagination_button" data-page="1">1</button>`;
  const lastBtn = `<button type="button" class="pagination_button" data-page="${totalPage}">${totalPage}</button>`;
  const dotsBtn = `<button type="button" class="pagination_button pagination_button-dots">...</button>`;
  paginationMurkup = arrowBtnLeft + firstBtn + lastBtn + arrowBtnRight;
  refs.paginationBox.innerHTML = paginationMurkup;
}
