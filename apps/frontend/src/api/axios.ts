import axios from 'axios';
import { API_ROUTES } from '../constants/apiRoutes';

let accessToken: string | null = null;

let onUnauthorizedCallback: (() => void) | null = null;

export const setAuthToken = (token: string | null) => {
  accessToken = token;
};

export const setUnauthorizedInterceptor = (callback: () => void) => {
  onUnauthorizedCallback = callback;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const apiNonSecure = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const token = localStorage.getItem('trueSeatsToken')
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(API_ROUTES.AUTH.REFRESH_TOKEN, {}, {
          baseURL: api.defaults.baseURL,
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        });

        const newAccessToken = response.data.accessToken;
        setAuthToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        // if refresh failed, i am triggering global logout
        onUnauthorizedCallback?.();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { api, apiNonSecure };
