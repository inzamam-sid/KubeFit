import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach access token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// 🔥 AUTO REFRESH TOKEN
API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          localStorage.getItem("refreshToken");

        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {
            refreshToken,
          }
        );

        const newAccessToken =
          res.data.accessToken;

        // Save new token
        localStorage.setItem(
          "token",
          newAccessToken
        );

        // Retry original request
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return API(originalRequest);

      } catch (err) {
        // Logout if refresh fails
        localStorage.clear();

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;