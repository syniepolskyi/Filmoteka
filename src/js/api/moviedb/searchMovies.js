import { BASE_URL } from '../../constants/moviedb';
import axios from 'axios';
import { Notify } from 'notiflix';

// повертає з бекенда об'єкт. Для доступу до масиву фільмів звертаємось до ключа results
const END_POINT = 'search/movie';
export async function searchMovies(searchParams) {
  try {
    return await axios.get(BASE_URL + searchParams.END_POINT, {
      params: searchParams.params,
    });
  } catch (error) {
    Notify.failure('Something went wrong');
    return;
  }
}
