import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  // headers: {
  //   Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`
  // }
});

export default api;