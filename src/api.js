import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    Authorization: 'Bearer 1|HcLf3d4xoXWGjOaygq1w8bxiaFdYscc2naadJOlP'
  }
});

export default api;