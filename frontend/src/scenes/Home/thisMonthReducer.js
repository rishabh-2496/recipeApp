import { createReducer } from "../../utils/reducerUtil";
import {
  GET_THISMONTH_RECIPE_START,
  GET_THISMONTH_RECIPE_SUCCESS,
  GET_THISMONTH_RECIPE_FAILURE,
  RESET_THISMONTH_RECIPE_STATE,
} from "./constants";

const intialState = {
  dataFetching: false,
  recipeList: { recipes: [] },
  dataFailure: false,
  failureMessage: "",
};

const getThisMonthRecipeStart = (state) => ({
  ...state,
  dataFetching: true,
  dataFailure: false,
  recipeList: { recipes: [...state.recipeList.recipes] },
  failureMessage: "",
});

const getThisMonthRecipeSuccess = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: false,
  recipeList: {
    next: payload.results.next,
    recipes: state.recipeList.recipes.concat(payload.results.recipes),
  },
  failureMessage: "",
});

const getThisMonthRecipeFailure = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: true,
  failureMessage: payload,
});

const resetThisMonthRecipeState = () => ({
  dataFetching: false,
  recipeList: { recipes: [] },
  dataFailure: false,
  failureMessage: "",
});

export default createReducer(intialState, {
  [GET_THISMONTH_RECIPE_START]: getThisMonthRecipeStart,
  [GET_THISMONTH_RECIPE_SUCCESS]: getThisMonthRecipeSuccess,
  [GET_THISMONTH_RECIPE_FAILURE]: getThisMonthRecipeFailure,
  [RESET_THISMONTH_RECIPE_STATE]: resetThisMonthRecipeState,
});
