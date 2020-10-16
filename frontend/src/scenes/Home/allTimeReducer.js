import { createReducer } from "./../../utils/reducerUtil";
import {
  GET_ALLTIME_RECIPE_START,
  GET_ALLTIME_RECIPE_SUCCESS,
  GET_ALLTIME_RECIPE_FAILURE,
  RESET_ALLTIME_RECIPE_STATE,
} from "./constants";

const intialState = {
  dataFetching: false,
  recipeList: { results: [] },
  dataFailure: false,
  failureMessage: "",
};

const getAllTimeRecipeStart = (state) => ({
  ...state,
  dataFetching: true,
  dataFailure: false,
  recipeList: { results: [...state.recipeList.results] },
  failureMessage: "",
});

const getAllTimeRecipeSuccess = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: false,
  recipeList: {
    next: payload.recipes.next,
    results: state.recipeList.results.concat(payload.recipes.results),
  },
  failureMessage: "",
});

const getAllTimeRecipeFailure = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: true,
  failureMessage: payload,
});

const resetAllTimeRecipeState = (state) => ({
  dataFetching: false,
  recipeList: { results: [] },
  dataFailure: false,
  failureMessage: "",
});

export default createReducer(intialState, {
  [GET_ALLTIME_RECIPE_START]: getAllTimeRecipeStart,
  [GET_ALLTIME_RECIPE_SUCCESS]: getAllTimeRecipeSuccess,
  [GET_ALLTIME_RECIPE_FAILURE]: getAllTimeRecipeFailure,
  [RESET_ALLTIME_RECIPE_STATE]: resetAllTimeRecipeState,
});
