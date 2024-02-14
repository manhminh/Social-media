import { createStore, applyMiddleware, combineReducers } from "redux";
import { authReducer } from "./auth/auth.reducer";
import { thunk } from "redux-thunk";
import postReducer from "./post/post.reducer";
import { messageReducer } from "./message/message.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  message: messageReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
