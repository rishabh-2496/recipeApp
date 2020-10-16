import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  RESET_PROFILE_STATE,
  EDIT_PROFILE_START,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
} from "./constants";

export const getProfileStart = (payload) => ({
  type: GET_PROFILE_START,
  payload: payload,
});

export const getProfileSuccess = (data) => ({
  type: GET_PROFILE_SUCCESS,
  payload: data,
});

export const getProfileFailure = (message) => ({
  type: GET_PROFILE_FAILURE,
  payload: message,
});

export const resetProfileState = () => ({
  type: RESET_PROFILE_STATE,
});

export const editProfileStart = (payload) => ({
  type: EDIT_PROFILE_START,
  payload: payload,
});

export const editProfileSuccess = (data) => ({
  type: EDIT_PROFILE_SUCCESS,
  payload: data,
});

export const editProfileFailure = (message) => ({
  type: EDIT_PROFILE_FAILURE,
  payload: message,
});
