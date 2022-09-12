import { Notify } from 'notiflix';
import { moviedbApi } from './moviedbapi';

export async function searchMovies(searchParams) {
  try {
    const res = await moviedbApi.get(searchParams.END_POINT, {
      params: searchParams.params,
    });
    return res.data;
  } catch (error) {
    Notify.failure('Something went wrong');
    return;
  }
}

export const search = { params: null };
