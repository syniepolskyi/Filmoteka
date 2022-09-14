import { Notify } from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
import { moviedbApi } from './moviedbapi';
import loader from '../../loader';

export async function searchMovies(searchParams) {
  loader();
  try {
    const res = await moviedbApi.get(searchParams.END_POINT, {
      params: searchParams.params,
    });
    return res.data;
  } catch (error) {
    Notify.failure('Something went wrong');
    return;
  } finally {
    setTimeout(() => {
      loader();
    }, 100);
    
  }
}

export const search = { params: null };
