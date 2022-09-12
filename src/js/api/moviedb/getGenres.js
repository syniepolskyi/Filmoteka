import { API_KEY, BASE_URL } from '../../constants/moviedb';
import axios from 'axios';

// Використовуеться для функції changeGenresIdtoName

const END_POINT_MOVIE = 'genre/movie/list';
const END_POINT_TV = 'genre/tv/list';
async function getMovieGenres() {
  const response = await axios.get(BASE_URL + END_POINT_MOVIE, {
    params: {
      api_key: API_KEY,
    },
  });

  return response.data.genres;
}
async function getTvGenres() {
  const response = await axios.get(BASE_URL + END_POINT_TV, {
    params: {
      api_key: API_KEY,
    },
  });

  return response.data.genres;
}

export async function genres() {
  const genresMovie = await getMovieGenres();
  const genresTv = await getTvGenres();
  const genres = genresTv.concat(genresMovie);

  return genres;
}
