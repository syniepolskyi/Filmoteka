import { API_KEY, BASE_URL } from '../../constants/moviedb';
import axios from 'axios';

const END_POINT = 'movie/';
export async function getTrending(id) {
  const response = await axios.get(BASE_URL + END_POINT + id, {
    params: {
      api_key: API_KEY,
    },
  });

  return response.data;
}

// getTrending(84773).then(data => console.log(data));
