import Swiper, { Navigation, Pagination } from 'swiper';
const bodyEl = document.querySelector('body');
const modalTeam = document.querySelector('.js-about-modal');
const btnCloseModalTeam = document.querySelector('.js-close-about-modal');
const btnOpenModalTeam = document.querySelector('.js-open-modal');

btnOpenModalTeam.addEventListener('click', openModalTeam);
btnCloseModalTeam.addEventListener('click', closeModalTeam);

function openModalTeam() {
    modalTeam.classList.remove('is-hidden')
    bodyEl.classList.add('modal-open');

    document.addEventListener('keydown', onKeyboardPush);
    document.addEventListener('click', cliskIntoVoid);
}

function onKeyboardPush(e) {
    if (e.code === "Escape") {
        closeModalTeam();
    }
}

function cliskIntoVoid(e) {
    if (e.target === modalTeam) {
        closeModalTeam();
    }
}

function closeModalTeam() {
    modalTeam.classList.add('is-hidden');
    bodyEl.classList.remove('modal-open');
    document.removeEventListener('keydown', onKeyboardPush);
}

const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    autoplay: {
        delay: '2500',
        disableOnInteraction: false,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    speed: 500,
    loop: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    grabCursor: true,
    slideToClickedSlide: true,
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    centeredSlides: true,
    initialSlide: 0,
    freeMode: true,
  });









// import Swiper, { Navigation, Pagination } from 'swiper';

// const btnOpenModalTeam = document.querySelector('.footer__btn');
// const modalAboutUs = document.querySelector('.js-modal-about-us');
// const body = document.querySelector('body');

// btnOpenModalTeam.addEventListener('click', openModalTeam);

// function openModalTeam() {
//     modalAboutUs.classList.remove('is-hidden')
//     body.classList.add('modal-open');

//     document.addEventListener('keydown', onKeyboardPush);
// }

// function onKeyboardPush(e) {
//     if (e.code === "Escape") {
//         closeModal();
//     }
// }

// function closeModal() {
//     modalAboutUs.classList.add('is-hidden');
//     body.classList.remove('modal-open');
//     document.removeEventListener('keydown', onKeyboardPush);
// }

// const swiper = new Swiper('.swiper', {
//     modules: [Navigation, Pagination],
//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//     },
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//     scrollbar: {
//       el: '.swiper-scrollbar',
//     },
//     autoplay: {
//         delay: '2500',
//         disableOnInteraction: false,
//     },
//     keyboard: {
//         enabled: true,
//         onlyInViewport: true,
//         pageUpDown: true,
//     },
//     speed: 500,
//     loop: true,
//     observer: true,
//     observeParents: true,
//     observeSlideChildren: true,
//     grabCursor: true,
//     slideToClickedSlide: true,
//     slidesPerView: 'auto',
//     slidesPerGroup: 1,
//     centeredSlides: true,
//     initialSlide: 0,
//     freeMode: true,
//   });