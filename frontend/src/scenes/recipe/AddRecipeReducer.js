import { createReducer } from "./../../utils/reducerUtil";
import {
  ADD_RECIPE_START,
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAILURE,
} from "./constants";

const intialState = {
  dataFetching: false,
  recipeData: {},
  dataFailure: false,
  failureMessage: "",
};

const addRecipeStart = (state) => ({
  ...state,
  dataFetching: true,
  dataFailure: false,
  recipeData: {},
  failureMessage: "",
});

const addRecipeSuccess = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: false,
  recipeData: payload,
  failureMessage: "",
});

const addRecipeFailure = (state, payload) => ({
  ...state,
  dataFetching: false,
  dataFailure: true,
  failureMessage: payload,
  recipeData: {},
});

export default createReducer(intialState, {
  [ADD_RECIPE_START]: addRecipeStart,
  [ADD_RECIPE_SUCCESS]: addRecipeSuccess,
  [ADD_RECIPE_FAILURE]: addRecipeFailure,
});
