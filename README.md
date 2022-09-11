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
- `api/moviedb/getGenres.js` - логіка для отримання жанрів фільмів
- `api/moviedb/getTrending.js` - логіка для отримання списку фільмів у трендах
- `api/moviedb/searchMovies.js` - логіка для отримання списку фільмів з пошукового рядку
- `api/moviedb/getMoviesDetails.js` - логіка для отримання інформації про фільм 
- `api/firebase/api.js` - основні функції API Firebase
- `index.js` - лістенери і логіка головної сторінки
- `library.js` - лістенери і логіка бібліотеки
- `queue.js` - зберігання доданих фільмів у черги
- `addQueue.js` - логіка додавання одного фільму в чергу на перегляд
- `library-main.js` - зберігання доданих переглянутих фільмів
- `addWatched.js` - логіка додавання одного фільму в чергу переглянутих
- `modalCard.js` - логіка роботи модалки з інформацією про фільм і модалки взагалі
- `modalAbout.js` - логіка роботи модалки з інформацією про учасників
- `upToTop.js` - логіка роботи кнопки "наверх"
- `loader.js` - функція виклику лоадера
