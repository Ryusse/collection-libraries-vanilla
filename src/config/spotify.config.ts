export const SPOTIFY_CONFIG = {
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID || '',
  clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || '',
  accessTokenUrl: import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN_URL || '',
  baseUrl: import.meta.env.VITE_SPOTIFY_BASE_URL || '',
} as const;

if (!SPOTIFY_CONFIG.clientId || !SPOTIFY_CONFIG.clientSecret) {
  console.error('Missing Spotify credentials in environment variables');
}
