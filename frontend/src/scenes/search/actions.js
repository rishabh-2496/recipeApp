import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  RESET_SEARCH_STATE,
} from "./constants";

export const searchStart = (payload) => ({
  type: SEARCH_START,
  payload: payload,
});

export const searchSuccess = (data) => ({
  type: SEARCH_SUCCESS,
  payload: data,
});

export const searchFailure = (message) => ({
  type: SEARCH_FAILURE,
  payload: message,
});

export const resetSearchState = () => ({
  type: RESET_SEARCH_STATE,
});
