import { API_KEY, BASE_URL } from '../../constants/moviedb';
import axios from 'axios';

const END_POINT = 'search/movie';
export async function searchMovies(query, page) {
  const response = await axios.get(BASE_URL + END_POINT, {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });

  return response.data;
}
