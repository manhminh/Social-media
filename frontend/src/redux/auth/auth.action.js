import axios from "axios";
import { API_BASE_URL, api } from "../../config/app";
import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "./auth.actionType";

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signin`,
      loginData.data
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    console.log("login success: ", data);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    console.log("error: ", error);
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};

export const registerUserAction = (registerData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      registerData.data
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    console.log("register success: ", data);
    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error: ", error);
    dispatch({ type: REGISTER_FAILURE, payload: error });
  }
};

export const getProfileAction = () => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });

  try {
    const { data } = await api.get(`/api/users/profile`);

    console.log("profile: ", data);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("error: ", error);
    dispatch({ type: GET_PROFILE_FAILURE, payload: error });
  }
};

export const searchUserAction = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });

  try {
    const { data } = await api.get(`/api/users/search?query=${query}`);

    console.log("users: ", data);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error: ", error);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error });
  }
};

export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });

  try {
    const { data } = await api.put(`/api/users`, reqData);

    console.log("profile: ", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("error: ", error);
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
  }
};
