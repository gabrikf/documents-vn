import axios from "axios";

export const api = axios.create({
  baseURL: `https://api.allorigins.win/raw?url=https://www.vendus.pt/ws/documents/`,
});
