import { createReducer } from "./../../utils/reducerUtil";
import {
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "./constants";

const intialState = {
  dataFetching: false,
  authData: {},
  dataFailure: false,
  failureMessage: "",
};

const resetPasswordStart = (state) => ({
  ...state,
  dataFetching: true,
  dataFailure: false,
  authData: {},
  failureMessage: "",
});

const resetPasswordSuccess = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: false,
  authData: payload,
  failureMessage: "",
});

const resetPasswordFailure = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: true,
  failureMessage: payload,
  authData: {},
});

export default createReducer(intialState, {
  [RESET_PASSWORD_START]: resetPasswordStart,
  [RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [RESET_PASSWORD_FAILURE]: resetPasswordFailure,
});
