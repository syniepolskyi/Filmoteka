import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';
import Swiper, { Navigation, Pagination } from 'swiper';
const aboutModal = document.querySelector('.js-about-modal');
const body = document.querySelector('body');
const btnOpenAboutModal = document.querySelector('.js-open-modal');
const btnCloseAboutModal = document.querySelector('.js-close-about-modal');
const swiperModal = document.querySelector('#swiper-modal')

btnOpenAboutModal.addEventListener('click', openAboutModal);
btnCloseAboutModal.addEventListener('click', closeAboutModal);

function openAboutModal() {
    aboutModal.classList.remove('is-hidden')
    body.classList.add('modal-open');

    document.addEventListener('keydown', onCloseEsc);
    document.addEventListener('click', function onCloseClick(e) {
        if (e.target === aboutModal) {
            closeAboutModal();
        }
    });
}

function onCloseEsc(e) {
    if (e.code === "Escape") {
        closeAboutModal();
    }
}

function closeAboutModal() {
    aboutModal.classList.add('is-hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onCloseEsc);
}

const swipers = new Swiper(swiperModal, {
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    mousewheel: {
        invert: true,
        sensitivity: 1,
        eventsTarget: "swiper"
    },
    centeredSlides: true,
    grabCursor: true,
    slideToClickedSlide: true,
    loop: true,
    slidesPerView: 'auto',
    freeMode: true,

});