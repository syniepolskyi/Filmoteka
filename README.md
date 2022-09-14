# Filmoteka
GoIT Project

## Налаштування і використання

```
node -v
> v14.18.3
npm -v
> 8.5.5
npm i
npm start
```

Потрібен веб-браузер з підтримкою ES6

## Структура файлів partials
- `main.html` - список фільмів (без пагінації)
- `pagination.html` - пагінація
- `card.html` - картка фільму в модалці
- `home-header.html` - заголовок головної сторінки
- `library-header.html` - заголовок сторінки бібліотеки - library.html
- `footer.html` - футер
- `up_btn.html` - кнопка для переходу на початок сторінки
- `about-modal.html` - модалка з інфою про учасників проjекту
- `loader.html` - loader - для очікування відповіді від бек-енду

## Структура файлів js
- `constants/refs.js` - всі статичні DOM об'єкти
- `constants/dynamicRefs.js` - всі динамічні DOM об'єкти (по суті функція)
- `constants/storage.js` - збережені ID для watched та queue
- `constants/moviedb.js` - константи для роботи з API themoviedb.org, <-- API_KEY тут
- `api/moviedb/changeGenresIdToName.js` - перетворення ID жанрів в назву
- `api/moviedb/getGenres.js` - логіка для отримання жанрів фільмів
- `api/moviedb/getMoviesDetails.js` - логіка для отримання інформації про фільм 
- `api/moviedb/getTrending.js` - логіка для отримання списку фільмів у трендах
- `api/moviedb/searchMovies.js` - логіка для отримання списку фільмів з пошукового рядку
- `api/firebase/api.js` - основні функції API Firebase
- `pagination/createPagination.js` - ініціалізація та рендер пагінації
- `pagination/onPaginationBtnClick.js` - лістенери на кнопки пагінації
- `features/auth/auth.js` - логіка і рендер модалки авторизації
- `features/trend-slider/slider-trend.js` - підключення слайдеру популярних фільмів (trends) на головній сторінці
- `features/upToTop/upToTop.js` - підключення кнопки на верх
- `addQueue.js` - логіка додавання одного фільму в чергу на перегляд
- `addWatched.js` - логіка додавання одного фільму в чергу переглянутих
- `loader.js` - функція виклику лоадера
- `modalCard.js` - логіка роботи модалки з інформацією про фільм і модалки взагалі
- `onFilmCardClick.js` - лістенер на елементи списку для виклику модалки з інформацією про фільм
- `onSearchFormSubmit.js` - лістенери для пошуку фільмів з використанням рядка пошуку
- `renderMovieList.js` - логіка ренедеру списку з фільмами
- `searchMoviesParam.js` - прототипи параметрів для пошуку в moviedb
- `library-main.js` - логіка на сторінці library.html
- `index.js` - лістенери і логіка головної сторінки
- `library.js` - лістенери і логіка бібліотеки
