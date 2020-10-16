import { createReducer } from "./../../utils/reducerUtil";
import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  RESET_PROFILE_STATE,
} from "./constants";

const intialState = {
  dataFetching: false,
  profileData: {
    user: {},
    data: {
      recipes: [],
    },
  },
  dataFailure: false,
  failureMessage: "",
};

const getProfileStart = (state) => ({
  ...state,
  dataFetching: true,
  dataFailure: false,
  profileData: {
    user: { ...state.profileData.user },
    data: {
      recipes: [...state.profileData.data.recipes],
    },
  },
  failureMessage: "",
});

const getProfileSuccess = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: false,
  profileData: {
    user: payload.user,
    data: {
      next: payload.data.next,
      recipes: state.profileData.data.recipes.concat(payload.data.recipes),
    },
  },
  failureMessage: "",
});

const getProfileFailure = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: true,
  failureMessage: payload,
});

export const resetProfileState = () => ({
  dataFetching: false,
  profileData: {
    user: {},
    data: {
      recipes: [],
    },
  },
  dataFailure: false,
  failureMessage: "",
});

export default createReducer(intialState, {
  [GET_PROFILE_START]: getProfileStart,
  [GET_PROFILE_SUCCESS]: getProfileSuccess,
  [GET_PROFILE_FAILURE]: getProfileFailure,
  [RESET_PROFILE_STATE]: resetProfileState,
});
