const baseUrl = import.meta.env.VITE_SPOTIFY_BASE_URL;
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

type RequestOptions = {
  headers?: Record<string, string>;
};

export const apiService = async (
  endpoint: string,
  options: RequestOptions = {},
) => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...options.headers,
      },
      body:
        'grant_type=client_credentials&client_id=' +
        clientId +
        '&client_secret=' +
        clientSecret,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};
