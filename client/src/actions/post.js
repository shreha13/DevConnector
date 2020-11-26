import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  GET_POST_START,
  UPDATE_LIKE,
  POST_ERROR,
  DELETE_POST,
  CREATE_POST,
  GET_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from "./types";

export const getPosts = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_POST_START,
      });

      const res = await axios.get("/api/posts");

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error, "danger"));
        });
      }
      dispatch({
        type: POST_ERROR,
      });
    }
  };
};

export const likePost = (postId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_POST_START,
      });

      const res = await axios.put("/api/posts/like/" + postId);

      dispatch({
        type: UPDATE_LIKE,
        payload: { id: postId, likes: res.data },
      });
    } catch (err) {
      const errors = err.response.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error, "danger"));
        });
      }
      dispatch({
        type: POST_ERROR,
      });
    }
  };
};

export const unlikePost = (postId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put("/api/posts/unlike/" + postId);

      dispatch({
        type: UPDATE_LIKE,
        payload: { id: postId, likes: res.data },
      });
    } catch (err) {
      const errors = err.response.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error, "danger"));
        });
      }
      dispatch({
        type: POST_ERROR,
      });
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      await axios.delete("/api/posts/" + postId);
      debugger;
      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
    } catch (err) {
      debugger;
      const errors = err.response.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error, "danger"));
        });
      }
      dispatch({
        type: POST_ERROR,
      });
    }
  };
};

export const createPost = (formData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: GET_POST_START,
      });

      const res = await axios.post("api/posts", formData, config);

      dispatch({
        type: CREATE_POST,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error, "danger"));
        });
      }
      dispatch({
        type: POST_ERROR,
      });
    }
  };
};

export const getPost = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_POST_START,
      });

      const res = await axios.get("/api/posts/" + id);

      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error, "danger"));
        });
      }
      dispatch({
        type: POST_ERROR,
      });
    }
  };
};

export const addComment = (id, formData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: GET_POST_START,
      });
      debugger;
      const res = await axios.put(`/api/posts/comment/${id}`, formData, config);

      dispatch({
        type: CREATE_COMMENT,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error, "danger"));
        });
      }
      dispatch({
        type: POST_ERROR,
      });
    }
  };
};

export const deleteComment = (postId, commentId) => {
    return async (dispatch) => {
      try {
        const res= await axios.delete("/api/posts/comment/" + postId + "/" + commentId);
        debugger;
        dispatch({
          type: DELETE_COMMENT,
          payload: res.data,
        });
      } catch (err) {
        debugger;
        const errors = err.response.errors;
        if (errors) {
          errors.forEach((error) => {
            dispatch(setAlert(error, "danger"));
          });
        }
        dispatch({
          type: POST_ERROR,
        });
      }
    };
  };
  