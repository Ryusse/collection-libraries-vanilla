import { SPOTIFY_CONFIG } from "@/config/spotify.config";
import { getStoredToken, updateStoredToken } from "@/utils/token.util";

const requestNewToken = async () => {
  try {
    const response = await fetch(SPOTIFY_CONFIG.accessTokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${SPOTIFY_CONFIG.clientId}&client_secret=${SPOTIFY_CONFIG.clientSecret}`,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Spotify API Request failed:", error);
    throw error;
  }
};

export const getAccessToken = async (): Promise<string> => {
  const { access_token, expires_in } = getStoredToken();
  const currentTime = Date.now();

  if (!access_token || !expires_in || currentTime >= expires_in) {
    const authResponse = await requestNewToken();
    updateStoredToken(authResponse.access_token, authResponse.expires_in);
    return authResponse.access_token;
  }

  return access_token;
};
