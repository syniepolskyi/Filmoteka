import Swiper, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';

import { getTrending } from '../../api/moviedb/getTrending';
import sliderContent from '../../../templates/slider-content.hbs';
import { onFilmCardClick } from '../../onFilmCardClick';

const swiperWrapper = document.querySelector('.swiper-wrapper');
const swiperRef = document.querySelector('#trends-swiper');

renderSwiper();

const swiper = new Swiper(swiperRef, {
  modules: [Pagination, Autoplay],
  loop: true,
  grabCursor: true,

  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 25,
      centeredSlides: false,
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 30,
      centeredSlides: true,
    },
  },

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

async function renderSwiper() {
  const { results } = await getTrending();
  swiperWrapper.innerHTML = sliderContent(results);
  swiper.update();
  document
    .querySelectorAll('[data-open-modal]')
    .forEach(card => card.addEventListener('click', onFilmCardClick));
}
