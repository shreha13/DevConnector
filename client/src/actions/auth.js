import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    try {
      const res = await axios.get("/api/auth");

      dispatch({ type: USER_LOADED, payload: res.data.user });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };
};

export const login = (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return async (dispatch) => {
    const user = {
      email,
      password,
    };
    const body = JSON.stringify(user);
    try {
      const res = await axios.post("/api/auth", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
};

export const register = (name, email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return async (dispatch) => {
    const newUser = {
      name,
      email,
      password,
    };

    const body = JSON.stringify(newUser);

    try {
      const res = await axios.post("/api/users", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.token,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      debugger;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT
    })
  }
}
