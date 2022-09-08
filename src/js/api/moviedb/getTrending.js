import { API_KEY, BASE_URL } from '../../constants/moviedb';
import axios from 'axios';

const END_POINT = 'trending/all/day';
export async function getTrending(page = 1) {
  const response = await axios.get(BASE_URL + END_POINT, {
    params: {
      api_key: API_KEY,
      page,
    },
  });

  return response.data;
}
