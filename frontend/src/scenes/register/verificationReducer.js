import { createReducer } from "./../../utils/reducerUtil";
import {
  VERIFICATION_START,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAILURE,
} from "./constants";

const intialState = {
  dataFetching: false,
  authData: {},
  dataFailure: false,
  failureMessage: "",
};

const verificationStart = (state) => ({
  ...state,
  dataFetching: true,
  dataFailure: false,
  authData: {},
  failureMessage: "",
});

const verificationSuccess = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: false,
  authData: payload,
  failureMessage: "",
});

const verificationFailure = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: true,
  failureMessage: payload,
  authData: {},
});

export default createReducer(intialState, {
  [VERIFICATION_START]: verificationStart,
  [VERIFICATION_SUCCESS]: verificationSuccess,
  [VERIFICATION_FAILURE]: verificationFailure,
});
