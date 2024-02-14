import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "./auth.actionType";

const initialState = {
  jwt: null,
  error: null,
  loading: false,
  user: null,
  searchUsers: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
    case UPDATE_PROFILE_REQUEST:
    case SEARCH_USER_REQUEST:
      return { ...state, loading: false, error: null };

    case GET_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        jwt: action.payload.token,
      };

    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUsers: action.payload,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
