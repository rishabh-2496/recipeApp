import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "./constants";

export const loginStart = (payload) => ({
  type: LOGIN_START,
  payload: payload,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (message) => ({
  type: LOGIN_FAILURE,
  payload: message,
});

export const forgotPasswordStart = (payload) => ({
  type: FORGOT_PASSWORD_START,
  payload: payload,
});

export const forgotPasswordSuccess = (data) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: data,
});

export const forgotPasswordFailure = (message) => ({
  type: FORGOT_PASSWORD_FAILURE,
  payload: message,
});

export const resetPasswordStart = (payload) => ({
  type: RESET_PASSWORD_START,
  payload: payload,
});

export const resetPasswordSuccess = (data) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: data,
});

export const resetPasswordFailure = (message) => ({
  type: RESET_PASSWORD_FAILURE,
  payload: message,
});
