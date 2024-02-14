import { api } from "../../config/app";
import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_USER_POST_FAILURE,
  GET_USER_POST_REQUEST,
  GET_USER_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "./post.actionType";

export const createPostAction = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });

  try {
    const { data } = await api.post(`/api/posts`, reqData.postData);

    reqData.sendMessageToServer(data);
    console.log("create post success: ", data);
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("error: ", error);
    dispatch({ type: CREATE_POST_FAILURE, payload: error });
  }
};

export const getAllPostAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUEST });

  try {
    const { data } = await api.get(`/api/posts`);

    console.log("get all post success: ", data);
    dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("error: ", error);
    dispatch({ type: GET_ALL_POST_FAILURE, payload: error });
  }
};

export const getUserPostAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_POST_REQUEST });

  try {
    const { data } = await api.get(`/api/posts/user/${userId}`);

    console.log("get user post success: ", data);
    dispatch({ type: GET_USER_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("error: ", error);
    dispatch({ type: GET_USER_POST_FAILURE, payload: error });
  }
};

export const likeUserPostAction = (postId) => async (dispatch) => {
  dispatch({ type: LIKE_POST_REQUEST });

  try {
    const { data } = await api.put(`/api/posts/like/${postId}`);

    console.log("get like post success: ", data);
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("error: ", error);
    dispatch({ type: LIKE_POST_FAILURE, payload: error });
  }
};

export const createCommentAction = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_COMMENT_REQUEST });

  try {
    const { data } = await api.post(
      `/api/comments/post/${reqData.postId}`,
      reqData.data
    );

    console.log("create comment success: ", data);
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    console.log("error: ", error);
    dispatch({ type: CREATE_COMMENT_FAILURE, payload: error });
  }
};
