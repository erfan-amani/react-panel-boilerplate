import { logout } from "@/redux/reducers/auth/authSlice";

export default function setupAxios(axios, store) {
  const { dispatch } = store;

  // set token
  axios.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const accessToken = state?.auth?.accessToken;

      if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const state = store.getState();

      // Handle logging out user
      if (error?.response?.status === 401 && !!state.auth.user) {
        dispatch(logout());
      }

      return Promise.reject(error);
    }
  );
}
