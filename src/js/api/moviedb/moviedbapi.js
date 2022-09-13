import axios from 'axios';
import { BASE_URL, API_KEY } from '../../constants/moviedb';

export const moviedbApi = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});
