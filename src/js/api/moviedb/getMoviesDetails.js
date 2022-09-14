import { moviedbApi } from './moviedbapi';
import { Notify } from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";

const END_POINT_MOVIE_BY_ID = 'movie/';
export async function getMoviesDetails(id) {
  try {
    const response = await moviedbApi.get(END_POINT_MOVIE_BY_ID + id);
    return response.data;
  } catch(err){
    Notify.failure('Something went wrong');
    return ;
  }
}
