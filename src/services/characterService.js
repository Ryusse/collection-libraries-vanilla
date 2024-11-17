import { apiService } from "./api";

export const getCharacters = async (page = 1) => {
  const data = await apiService(`/character`);
  return data.results;
};
