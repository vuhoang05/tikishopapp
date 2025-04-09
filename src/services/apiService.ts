import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
  timeout: 2000,
  // headers: { 'X-Custom-Header': 'foobar' }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = token;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log("response", response);
  if (response.data) {
    return response.data;
  }
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default instance;
