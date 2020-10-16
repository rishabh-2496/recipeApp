import { createReducer } from "./../../utils/reducerUtil";
import {
  GET_TODAY_RECIPE_START,
  GET_TODAY_RECIPE_SUCCESS,
  GET_TODAY_RECIPE_FAILURE,
  RESET_TODAY_RECIPE_STATE,
} from "./constants";

const intialState = {
  dataFetching: false,
  recipeList: { recipes: [] },
  dataFailure: false,
  failureMessage: "",
};

const getTodayRecipeStart = (state) => ({
  ...state,
  dataFetching: true,
  dataFailure: false,
  recipeList: { recipes: [...state.recipeList.recipes] },
  failureMessage: "",
});

const getTodayRecipeSuccess = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: false,
  recipeList: {
    next: payload.results.next,
    recipes: state.recipeList.recipes.concat(payload.results.recipes),
  },
  failureMessage: "",
});

const getTodayRecipeFailure = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: true,
  failureMessage: payload,
});

const resetTodayRecipeState = (state) => ({
  dataFetching: false,
  recipeList: { recipes: [] },
  dataFailure: false,
  failureMessage: "",
});

export default createReducer(intialState, {
  [GET_TODAY_RECIPE_START]: getTodayRecipeStart,
  [GET_TODAY_RECIPE_SUCCESS]: getTodayRecipeSuccess,
  [GET_TODAY_RECIPE_FAILURE]: getTodayRecipeFailure,
  [RESET_TODAY_RECIPE_STATE]: resetTodayRecipeState,
});
