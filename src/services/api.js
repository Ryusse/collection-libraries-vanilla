import { delay } from "../utils";

const BASE_URL = "https://rickandmortyapi.com/api";

export const apiService = async (endpoint, options = {}) => {
  try {
    //await delay(10000);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Request failed:", error);
    throw error;
  }
};
