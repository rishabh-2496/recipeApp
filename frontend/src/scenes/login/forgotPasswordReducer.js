import { createReducer } from "./../../utils/reducerUtil";
import {
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "./constants";

const intialState = {
  dataFetching: false,
  authData: {},
  dataFailure: false,
  failureMessage: "",
};

const forgotPasswordStart = (state) => ({
  ...state,
  dataFetching: true,
  dataFailure: false,
  authData: {},
  failureMessage: "",
});

const forgotPasswordSuccess = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: false,
  authData: payload,
  failureMessage: "",
});

const forgotPasswordFailure = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: true,
  failureMessage: payload,
  authData: {},
});

export default createReducer(intialState, {
  [FORGOT_PASSWORD_START]: forgotPasswordStart,
  [FORGOT_PASSWORD_SUCCESS]: forgotPasswordSuccess,
  [FORGOT_PASSWORD_FAILURE]: forgotPasswordFailure,
});
