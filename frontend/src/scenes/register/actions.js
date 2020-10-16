import {
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  VERIFICATION_START,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAILURE,
} from "./constants";

export const registerationStart = (payload) => ({
  type: REGISTRATION_START,
  payload: payload,
});

export const registerationSuccess = (data) => ({
  type: REGISTRATION_SUCCESS,
  payload: data,
});

export const registerationFailure = (message) => ({
  type: REGISTRATION_FAILURE,
  payload: message,
});

export const verificationStart = (payload) => (
  console.log("called", payload),
  {
    type: VERIFICATION_START,
    payload: payload,
  }
);

export const verificationSuccess = (data) => ({
  type: VERIFICATION_SUCCESS,
  payload: data,
});

export const verificationFailure = (data) => ({
  type: VERIFICATION_FAILURE,
  payload: data,
});
