import { createReducer } from "./../../utils/reducerUtil";
import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  RESET_SEARCH_STATE,
} from "./constants";

const intialState = {
  dataFetching: false,
  searchResult: {
    recipes: [],
  },
  dataFailure: false,
  failureMessage: "",
};

const searchStart = (state) => ({
  ...state,
  dataFetching: true,
  dataFailure: false,
  searchResult: { recipes: [...state.searchResult.recipes] },
  failureMessage: "",
});

const searchSuccess = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: false,
  searchResult: {
    next: payload.searchResults.next,
    recipes: state.searchResult.recipes.concat(payload.searchResults.recipes),
  },
  failureMessage: "",
});

const searchFailure = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: true,
  failureMessage: payload,
});

const resetSearchState = () => ({
  dataFetching: false,
  searchResult: {
    recipes: [],
  },
  dataFailure: false,
  failureMessage: "",
});

export default createReducer(intialState, {
  [SEARCH_START]: searchStart,
  [SEARCH_SUCCESS]: searchSuccess,
  [SEARCH_FAILURE]: searchFailure,
  [RESET_SEARCH_STATE]: resetSearchState,
});
