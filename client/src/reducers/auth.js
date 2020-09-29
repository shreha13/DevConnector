import { REGISTER_FAIL, REGISTER_SUCCESS } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload);
      return {
        ...initialState,
        payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...initialState,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}