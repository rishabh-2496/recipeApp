import { createReducer } from "./../../utils/reducerUtil";
import {
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
} from "./constants";

const intialState = {
  dataFetching: false,
  authData: {},
  dataFailure: false,
  failureMessage: "",
};

const registerationStart = (state) => ({
  ...state,
  dataFetching: true,
  dataFailure: false,
  authData: {},
  failureMessage: "",
});

const registerationSuccess = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: false,
  authData: payload,
  failureMessage: "",
});

const registerationFailure = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: true,
  failureMessage: payload,
  authData: {},
});

export default createReducer(intialState, {
  [REGISTRATION_START]: registerationStart,
  [REGISTRATION_SUCCESS]: registerationSuccess,
  [REGISTRATION_FAILURE]: registerationFailure,
});
