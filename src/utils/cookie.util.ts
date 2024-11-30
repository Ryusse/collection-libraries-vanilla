export const setCookie = (
  name: string,
  value: string,
  expiresInSeconds: number,
): void => {
  const date = new Date();
  date.setTime(date.getTime() + expiresInSeconds * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
};

export const getCookie = (name: string): string | null => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    let c = cookie.trim();
    if (c.startsWith(cookieName)) {
      return c.substring(cookieName.length);
    }
  }
  return null;
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};
