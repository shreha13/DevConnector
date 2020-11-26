const {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAIL,
  GET_REPOS,
  CREATE_PROFILE_START,
  UPDATE_PROFILE,
} = require("../actions/types");

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  isLoading: true,
  error: {},
};

const reducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case CREATE_PROFILE_SUCCESS:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        isLoading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    case PROFILE_ERROR:
    case CLEAR_PROFILE:
    case CREATE_PROFILE_FAIL:
      return {
        ...state,
        profile: null,
        error: payload,
        repos: [],
        isLoading: false,
      };
    case CREATE_PROFILE_START:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducers;
