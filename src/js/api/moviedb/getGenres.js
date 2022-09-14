import { moviedbApi } from './moviedbapi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.5.min.css";

// Використовуеться для функції changeGenresIdToName

const END_POINT_MOVIE = 'genre/movie/list';
const END_POINT_TV = 'genre/tv/list';
async function getMovieGenres() {
    const response = await moviedbApi.get(END_POINT_MOVIE);
    return response.data.genres;
}
async function getTvGenres() {
    const response = await moviedbApi.get(END_POINT_TV);
    return response.data.genres;
}

export async function genres() {
  const genresMovie = await getMovieGenres();
  const genresTv = await getTvGenres();
  const genres = genresTv.concat(genresMovie);

  return genres;
}
