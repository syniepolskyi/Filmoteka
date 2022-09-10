import { API_KEY, BASE_URL } from '../../constants/moviedb';
import axios from 'axios';
import { Notify } from 'notiflix';

// повертає з бекенда об'єкт. Для доступу до масиву фільмів звертаємось до ключа results
const END_POINT = 'search/movie';
export async function searchMovies(query, page) {
  try {
    return await axios.get(BASE_URL + END_POINT, {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    });
  } catch (error) {
    Notify.failure('Something went wrong');
    return;
  }
}
