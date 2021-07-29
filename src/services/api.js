import axios from "axios";

const BASE_URL = `http://127.0.0.1:3009`;
const REQUEST_TIMEOUT = 5000;

/** Returns an api for fetching data.
 * @return {function}
*/
export const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  const onSuccess = (response) => response;

  const onError = (error) => {
    throw error;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};
