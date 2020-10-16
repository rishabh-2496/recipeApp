import { createReducer } from "./../../utils/reducerUtil";
import {
  POST_COMMENT_START,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  GET_COMMENT_START,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAILURE,
} from "./constants";

const intialState = {
  commentPostLoading: false,
  commentPostFailure: false,
  commentPostFailureMessage: "",
  getCommentsLoading: false,
  commentData: {},
  getCommentFailure: false,
  getCommentFailureMessage: "",
};

//==== post comment =====
const postCommentStart = (state) => ({
  ...state,
  commentPostLoading: true,
  commentPostFailure: false,
  commentPostFailureMessage: "",
});

const postCommentSuccess = (state, payload) => ({
  ...state,
  commentPostLoading: false,
  commentPostFailure: false,
  commentData: [payload],
  commentPostFailureMessage: "",
});

const postCommentFailure = (state, payload) => ({
  ...state,
  commentPostLoading: false,
  commentPostFailure: true,
  commentPostFailureMessage: payload,
});

//==== get comment =======

const getCommentStart = (state) => ({
  ...state,
  getCommentsLoading: true,
  commentPostFailure: false,
  getCommentFailureMessage: "",
  commentData: {},
});

const getCommentSuccess = (state, payload) => ({
  ...state,
  getCommentsLoading: false,
  getCommentFailure: false,
  getCommentFailureMessage: "",
  commentData: payload,
});

const getCommentFailure = (state, payload) => ({
  ...state,
  commentPostLoading: false,
  getCommentFailure: true,
  getCommentFailureMessage: payload,
  commentData: {},
});

export default createReducer(intialState, {
  [POST_COMMENT_START]: postCommentStart,
  [POST_COMMENT_SUCCESS]: postCommentSuccess,
  [POST_COMMENT_FAILURE]: postCommentFailure,
  [GET_COMMENT_START]: getCommentStart,
  [GET_COMMENT_SUCCESS]: getCommentSuccess,
  [GET_COMMENT_FAILURE]: getCommentFailure,
});
