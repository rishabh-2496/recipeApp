import { createReducer } from "./../../utils/reducerUtil";
import {
  EDIT_PROFILE_START,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
} from "./constants";

const intialState = {
  dataFetching: false,
  userData: {},
  dataFailure: false,
  failureMessage: "",
};

const editProfileStart = (state) => ({
  ...state,
  dataFetching: true,
  dataFailure: false,
  userData: {},
  failureMessage: "",
});

const editProfileSuccess = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: false,
  userData: payload,
  failureMessage: "",
});

const editProfileFailure = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: true,
  failureMessage: payload,
  userData: {},
});

export default createReducer(intialState, {
  [EDIT_PROFILE_START]: editProfileStart,
  [EDIT_PROFILE_SUCCESS]: editProfileSuccess,
  [EDIT_PROFILE_FAILURE]: editProfileFailure,
});
