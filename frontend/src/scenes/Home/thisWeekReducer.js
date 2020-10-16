import { createReducer } from "../../utils/reducerUtil";
import {
  GET_THISWEEK_RECIPE_START,
  GET_THISWEEK_RECIPE_SUCCESS,
  GET_THISWEEK_RECIPE_FAILURE,
  RESET_THISWEEK_RECIPE_STATE,
} from "./constants";

const intialState = {
  dataFetching: false,
  recipeList: { recipes: [] },
  dataFailure: false,
  failureMessage: "",
};

const getThisWeekRecipeStart = (state) => ({
  ...state,
  dataFetching: true,
  dataFailure: false,
  recipeList: { recipes: [...state.recipeList.recipes] },
  failureMessage: "",
});

const getThisWeekRecipeSuccess = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: false,
  recipeList: {
    next: payload.results.next,
    recipes: state.recipeList.recipes.concat(payload.results.recipes),
  },
  failureMessage: "",
});

const getThisWeekRecipeFailure = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: true,
  failureMessage: payload,
});

const resetThisWeekRecipeState = (state) => ({
  dataFetching: false,
  recipeList: { recipes: [] },
  dataFailure: false,
  failureMessage: "",
});

export default createReducer(intialState, {
  [GET_THISWEEK_RECIPE_START]: getThisWeekRecipeStart,
  [GET_THISWEEK_RECIPE_SUCCESS]: getThisWeekRecipeSuccess,
  [GET_THISWEEK_RECIPE_FAILURE]: getThisWeekRecipeFailure,
  [RESET_THISWEEK_RECIPE_STATE]: resetThisWeekRecipeState,
});
