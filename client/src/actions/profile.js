import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CREATE_PROFILE_FAIL,
  CREATE_PROFILE_SUCCESS,
  GET_REPOS,
  CREATE_PROFILE_START,
  UPDATE_PROFILE,
} from "./types";

export const getProfile = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/profile/me");
      const profile = res.data.profile;
      dispatch({
        type: GET_PROFILE,
        payload: profile,
      });
    } catch (err) {
      const msg = err.response.data.msg;
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg, status: err.response.status },
      });
    }
  };
};

export const getProfiles = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/profile");
      const profiles = res.data.profiles;
      dispatch({
        type: GET_PROFILES,
        payload: profiles,
      });
    } catch (err) {
      const msg = err.response.data.msg;
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg, status: err.response.status },
      });
    }
  };
};

export const getProfileById = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/profile/user/" + userId);
      const profile = res.data.profile;
      dispatch({
        type: GET_PROFILE,
        payload: profile,
      });
    } catch (err) {
      const msg = err.response.data.msg;
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg, status: err.response.status },
      });
    }
  };
};

export const getGitRepo = (username) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/profile/github/" + username);

      const repos = res.data;
      dispatch({
        type: GET_REPOS,
        payload: repos,
      });
    } catch (err) {
      const msg = err.response.data.msg;
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg, status: err.response.status },
      });
    }
  };
};

export const createProfile = (profileData, history, edit = false) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(profileData);
    try {
      dispatch({
        type: CREATE_PROFILE_START,
      });
      const res = await axios.post("/api/profile", body, config);

      const profile = res.data.profile;

      dispatch({
        type: CREATE_PROFILE_SUCCESS,
        payload: profile,
      });
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }
      dispatch({
        type: CREATE_PROFILE_FAIL,
      });
    }
  };
};

export const addExperience = (experienceData, history) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(experienceData);
    try {
      dispatch({
        type: CREATE_PROFILE_START,
      });
      const res = await axios.put("/api/profile/experience", body, config);

      const profile = res.data.profile;

      dispatch({
        type: UPDATE_PROFILE,
        payload: profile,
      });

      history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error, "danger"));
        });
      }
      dispatch({
        type: CREATE_PROFILE_FAIL,
      });
    }
  };
};

export const addEducation = (educationData, history) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(educationData);
    try {
      dispatch({
        type: CREATE_PROFILE_START,
      });
      const res = await axios.put("/api/profile/education", body, config);

      const profile = res.data.profile;

      dispatch({
        type: UPDATE_PROFILE,
        payload: profile,
      });

      history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error, "danger"));
        });
      }
      dispatch({
        type: CREATE_PROFILE_FAIL,
      });
    }
  };
};

export const deleteEducation = (educationId) => {
  return async (dispatch) => {
    if (window.confirm("Your education will be deleted permanently")) {
      try {
        dispatch({
          type: CREATE_PROFILE_START,
        });
        const res = await axios.delete(`/api/profile/education/${educationId}`);

        const profile = res.data.profile;

        dispatch({
          type: UPDATE_PROFILE,
          payload: profile,
        });
      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => {
            dispatch(setAlert(error, "danger"));
          });
        }
        dispatch({
          type: CREATE_PROFILE_FAIL,
        });
      }
    }
  };
};

export const deleteExperience = (experienceId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_PROFILE_START,
      });
      const res = await axios.delete(`/api/profile/experience/${experienceId}`);

      const profile = res.data.profile;

      dispatch({
        type: UPDATE_PROFILE,
        payload: profile,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error, "danger"));
        });
      }
      dispatch({
        type: CREATE_PROFILE_FAIL,
      });
    }
  };
};
