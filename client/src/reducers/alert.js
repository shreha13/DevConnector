import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initalState = [];

export default function (state = initalState, { type, payload }) {
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((i) => i.id !== payload);
    default:
      return state;
  }
}
