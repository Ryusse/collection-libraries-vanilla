import { apiService } from "./api.service";

export const getTracks = async () => {
  const data = await apiService(
    `search?q=joji&type=album&include_external=audio`,
  );
  return data;
};
