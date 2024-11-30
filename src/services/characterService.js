import { apiService } from './api';

export const getCharacters = async () => {
  const data = await apiService(`/character`);
  return data.results;
};
