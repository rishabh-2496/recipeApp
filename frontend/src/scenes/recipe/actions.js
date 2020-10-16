import {
  ADD_RECIPE_START,
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAILURE,
  POST_COMMENT_START,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  GET_COMMENT_START,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAILURE,
  POST_REPLY_START,
  POST_REPLY_SUCCESS,
  POST_REPLY_FAILURE,
  GET_RECIPE_DETAIL_START,
  GET_RECIPE_DETAIL_SUCCESS,
  GET_RECIPE_DETAIL_FAILURE,
} from "./constants";

export const addRecipeStart = (payload) => ({
  type: ADD_RECIPE_START,
  payload: payload,
});

export const addRecipeSuccess = (data) => ({
  type: ADD_RECIPE_SUCCESS,
  payload: data,
});

export const addRecipeFailure = (message) => ({
  type: ADD_RECIPE_FAILURE,
  payload: message,
});

//==========post comment===========

export const postCommentStart = (payload) => ({
  type: POST_COMMENT_START,
  payload: payload,
});

export const postCommentSuccess = (data) => ({
  type: POST_COMMENT_SUCCESS,
  payload: data,
});

export const postCommentFailure = (message) => ({
  type: POST_COMMENT_FAILURE,
  payload: message,
});

//======== get comments ============

export const getCommentStart = (payload) => ({
  type: GET_COMMENT_START,
  payload: payload,
});

export const getCommentSuccess = (data) => ({
  type: GET_COMMENT_SUCCESS,
  payload: data,
});

export const getCommentFailure = (message) => ({
  type: GET_COMMENT_FAILURE,
  payload: message,
});

//======== get replies ============

export const postReplyStart = (payload) => ({
  type: POST_REPLY_START,
  payload: payload,
});

export const postReplySuccess = (data) => ({
  type: POST_REPLY_SUCCESS,
  payload: data,
});

export const postReplyFailure = (message) => ({
  type: POST_REPLY_FAILURE,
  payload: message,
});

//======= get recipe ================

export const getRecipeDetailStart = (payload) => ({
  type: GET_RECIPE_DETAIL_START,
  payload: payload,
});

export const getRecipeDetailSuccess = (data) => ({
  type: GET_RECIPE_DETAIL_SUCCESS,
  payload: data,
});

export const getRecipeDetailFailure = (message) => ({
  type: GET_RECIPE_DETAIL_FAILURE,
  payload: message,
});
