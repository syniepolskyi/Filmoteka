import { genres } from '../api/moviedb/getGenres ';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.5.min.css";

// Функцію треба визвати після запиту з бекенда і передати туди результат запиту для замінт id жанру на назву жанру
export async function changeGenresIdToName(movies) {
  try {
    const genersList = await genres();
    movies.forEach(element => {
      const array = element.genre_ids;
      if (!array) return 'Other';
      const newArr = array.map(elem => {
        if (genersList.find(x => x.id === elem)) {
          return genersList.find(x => x.id === elem).name;
        } else {
          return 'Other';
        }
      });

      element.genre_ids = newArr;
    });
  } catch (error) {
    Notify.failure("Something went wrong");
  }
}
