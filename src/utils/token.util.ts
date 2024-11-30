import { getCookie } from "./cookie.util";

export const TOKEN_COOKIE_NAME = "spotify_access_token";
export const EXPIRATION_COOKIE_NAME = "spotify_token_expiration";

type TokenStore = {
  access_token: string | null;
  expires_in: number | null;
  token_type?: string | null;
};

const tokenStore: TokenStore = {
  access_token: null,
  expires_in: null,
  token_type: null,
};

export const getStoredToken = () => {
  const access_token = getCookie(TOKEN_COOKIE_NAME);
  const expires_in = getCookie(EXPIRATION_COOKIE_NAME);

  return {
    access_token,
    expires_in: expires_in ? parseInt(expires_in, 10) : null,
  };
};

export const updateStoredToken = (token: string, expiresIn: number): void => {
  tokenStore.access_token = token;
  tokenStore.expires_in = Date.now() + expiresIn * 1000;
};
