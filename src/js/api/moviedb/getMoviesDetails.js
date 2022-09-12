import { API_KEY, BASE_URL } from '../../constants/moviedb';
import { moviedbApi } from './moviedbapi';

const END_POINT_MOVIE_BY_ID = 'movie/';
export async function getMoviesDetails(id) {
  const response = await moviedbApi.get(END_POINT_MOVIE_BY_ID + id);

  return response.data;
}

// getMoviesDetails(84773).then(data => console.log(data));
