import axios from "axios";
import store from "@/store/index";
import router from "@/router";

const config = {
  baseURL: process.env.VUE_APP_API_KEY,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(config);

const authInterceptor = (request) => {
  const auth = store.getters["user/auth"];
  const token = store.getters["user/token"];

  if (auth) {
    request.headers.Authorization = `Bearer ${token}`;
    request.headers["Access-Control-Allow-Origin"] = "*";
  }

  return request;
};

const errorInterceptor = (error) => {
  switch (error.response.status) {
    case 400:
      console.log(error.response.status, error.message);
      break;

    case 401:
      console.log(error.response.status, error.message);
      localStorage.removeItem("token");
      router.push({ name: "login" });
      break;
  }

  return Promise.reject(error);
};

const getResponse = (response) => {
  return response;
};

instance.interceptors.request.use(authInterceptor);
instance.interceptors.response.use(getResponse, errorInterceptor);

export default instance;
