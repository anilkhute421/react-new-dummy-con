import axios from "axios";
import { BaseUrl, apiVersion } from "../utils/constants";
import { store } from "../store/Store";

import { logout } from "../store/action/AuthAction";

const EndPoint = BaseUrl + apiVersion;

const Api = axios.create({
  timeout: 1000000,
  baseURL: EndPoint,
});

Api.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
Api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
Api.interceptors.request.use(
  (config) => {
    if (store.getState().Auth.token !== null) {
      const token = `Bearer ${store.getState().Auth.token}`;
      const lang = store.getState().Language.language;
      config.headers = {
        Authorization: token,
        lang: lang,
      };
    }

    return config;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);
// Add a response interceptor
Api.interceptors.response.use(
  (response) => {
    if (response.data.status === 401) {
      store.dispatch(logout());
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default Api;
