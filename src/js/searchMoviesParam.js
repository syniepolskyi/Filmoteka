import { API_KEY } from './constants/moviedb';

export const trendsSearchParams = {
  END_POINT: 'trending/movie/day',
  params: {
    api_key: API_KEY,
    page: 1,
  },
};

export const movieSearchParams = {
  END_POINT: 'search/movie',
  params: {
    api_key: API_KEY,
    query: '',
    page: 1,
  },
};
