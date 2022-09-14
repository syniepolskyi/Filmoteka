import Swiper, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';

import sliderContent from '../../../templates/slider-content.hbs';
import { onFilmCardClick } from '../../onFilmCardClick';
import { moviedbApi } from '../../api/moviedb/moviedbapi';
import { refs } from '../../constants/refs';

const TRENDING_END_POINT = 'trending/movie/week';
const swiperWrapper = refs.swiperWrapper;
const swiperRef = refs.swiperRef;

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
  const results = await moviedbApi.get(TRENDING_END_POINT);
  swiperWrapper.innerHTML = sliderContent(results.data.results);
  swiper.update();
  document
    .querySelectorAll('[data-open-modal]')
    .forEach(card => card.addEventListener('click', onFilmCardClick));
}
