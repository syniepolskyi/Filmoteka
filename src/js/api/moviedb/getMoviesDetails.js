import { API_KEY, BASE_URL } from '../../constants/moviedb';
import axios from 'axios';

const END_POINT = 'movie/';
export async function getMoviesDetails(id) {
  const response = await axios.get(BASE_URL + END_POINT + id, {
    params: {
      api_key: API_KEY,
    },
  });

  return response.data;
}

// getMoviesDetails(84773).then(data => console.log(data));
