import { API_KEY, BASE_URL } from '../../constants/moviedb';
import axios from 'axios';

const END_POINT = 'genre/movie/list';
export async function getGenres() {
  const response = await axios.get(BASE_URL + END_POINT, {
    params: {
      api_key: API_KEY,
    },
  });

  return response.data.genres;
}

// getGenres().then(data => console.log((arr = data.genres)));
