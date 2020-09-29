import axios from 'axios';
import { setAlert } from "./alert";
import { REGISTER_FAIL, REGISTER_SUCCESS, REMOVE_ALERT, SET_ALERT } from "./types";

export const register = ({name, email, password}) => async (dispatch) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

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
            payload: res.data.token
        })
      } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error, 'danger'))
            });
        }
        dispatch({
            type: REGISTER_FAIL
        })
      }
}