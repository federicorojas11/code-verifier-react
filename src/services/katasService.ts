import { AxiosRequestConfig } from "axios";
import axios from "../utils/config/axios.config";

export const getAllKatas = (token: string, limit?: number, page?: number) => {
  // GET http://localhost:8000/api/katas?limit=1&page=1

  // Add headers with JWT in x-access-token
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
    },
    params: { limit, page },
  };

  return axios.get("katas", options);
};
