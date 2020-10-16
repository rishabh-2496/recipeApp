import { createReducer } from "./../../utils/reducerUtil";
import {
  GET_RECIPE_DETAIL_START,
  GET_RECIPE_DETAIL_SUCCESS,
  GET_RECIPE_DETAIL_FAILURE,
} from "./constants";

const intialState = {
  getRecipeDetailLoading: false,
  getRepliesDetailFailure: false,
  getRepliesDetailFailureMessage: "",
  repliesDetailData: {},
};

export const getRecipeDetailStart = (state) => ({
  ...state,
  getRecipeDetailLoading: true,
  getRepliesDetailFailure: false,
  getRepliesDetailFailureMessage: "",
  repliesDetailData: {},
});

export const getRecipeDetailSuccess = (state, payload) => ({
  ...state,
  getRecipeDetailLoading: false,
  getRepliesDetailFailure: false,
  getRepliesDetailFailureMessage: "",
  repliesDetailData: payload,
});

export const getRecipeDetailFailure = (state, payload) => ({
  ...state,
  getRecipeDetailLoading: false,
  getRepliesDetailFailure: true,
  getRepliesDetailFailureMessage: payload,
  repliesDetailData: {},
});

export default createReducer(intialState, {
  [GET_RECIPE_DETAIL_START]: getRecipeDetailStart,
  [GET_RECIPE_DETAIL_SUCCESS]: getRecipeDetailSuccess,
  [GET_RECIPE_DETAIL_FAILURE]: getRecipeDetailFailure,
});
