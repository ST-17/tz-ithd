import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://backend.e-quzhat.ithd.kz/api/',
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance };
