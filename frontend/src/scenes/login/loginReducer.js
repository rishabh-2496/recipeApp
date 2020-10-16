import { createReducer } from "./../../utils/reducerUtil";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from "./constants";

const intialState = {
  dataFetching: false,
  authData: {},
  dataFailure: false,
  failureMessage: "",
};

const loginStart = (state) => ({
  ...state,
  dataFetching: true,
  dataFailure: false,
  authData: {},
  failureMessage: "",
});

const loginSuccess = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: false,
  authData: payload,
  failureMessage: "",
});

const loginFailure = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: true,
  failureMessage: payload,
  authData: {},
});

export default createReducer(intialState, {
  [LOGIN_START]: loginStart,
  [LOGIN_SUCCESS]: loginSuccess,
  [LOGIN_FAILURE]: loginFailure,
});
