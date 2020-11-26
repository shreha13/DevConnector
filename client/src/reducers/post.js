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
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  error: null,
  loading: false,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_POST_START:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: payload,
      };
    case UPDATE_LIKE:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((i) =>
          i._id === payload.id ? { ...i, likes: payload.likes } : i
        ),
      };
    case CREATE_POST:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((i) => i._id !== payload),
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case GET_POST:
      return {
        ...state,
        loading: false,
        post: payload,
      };
    case CREATE_COMMENT:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comments: payload },
      };
    case DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        post: {...state.post, comments: payload}
      };
    default:
      return state;
  }
}
