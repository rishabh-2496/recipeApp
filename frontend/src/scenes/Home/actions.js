import {
  GET_ALLTIME_RECIPE_START,
  GET_ALLTIME_RECIPE_SUCCESS,
  GET_ALLTIME_RECIPE_FAILURE,
  RESET_ALLTIME_RECIPE_STATE,
  GET_TODAY_RECIPE_START,
  GET_TODAY_RECIPE_SUCCESS,
  GET_TODAY_RECIPE_FAILURE,
  RESET_TODAY_RECIPE_STATE,
  GET_THISWEEK_RECIPE_START,
  GET_THISWEEK_RECIPE_SUCCESS,
  GET_THISWEEK_RECIPE_FAILURE,
  RESET_THISWEEK_RECIPE_STATE,
  GET_THISMONTH_RECIPE_START,
  GET_THISMONTH_RECIPE_SUCCESS,
  GET_THISMONTH_RECIPE_FAILURE,
  RESET_THISMONTH_RECIPE_STATE,
} from "./constants";

export const getAllTimeRecipeStart = (payload) => ({
  type: GET_ALLTIME_RECIPE_START,
  payload: payload,
});

export const getAllTimeRecipeSuccess = (data) => ({
  type: GET_ALLTIME_RECIPE_SUCCESS,
  payload: data,
});

export const getAllTimeRecipeFailure = (message) => ({
  type: GET_ALLTIME_RECIPE_FAILURE,
  payload: message,
});

export const resetAllTimeRecipeState = () => ({
  type: RESET_ALLTIME_RECIPE_STATE,
});

export const getTodayRecipeStart = (payload) => ({
  type: GET_TODAY_RECIPE_START,
  payload: payload,
});

export const getTodayRecipeSuccess = (data) => ({
  type: GET_TODAY_RECIPE_SUCCESS,
  payload: data,
});

export const getTodayRecipeFailure = (message) => ({
  type: GET_TODAY_RECIPE_FAILURE,
  payload: message,
});

export const resetTodayRecipeState = () => ({
  type: RESET_TODAY_RECIPE_STATE,
});

export const getThisWeekRecipeStart = (payload) => ({
  type: GET_THISWEEK_RECIPE_START,
  payload: payload,
});

export const getThisWeekRecipeSuccess = (data) => ({
  type: GET_THISWEEK_RECIPE_SUCCESS,
  payload: data,
});

export const resetThisWeekRecipeState = () => ({
  type: RESET_THISWEEK_RECIPE_STATE,
});

export const getThisWeekRecipeFailure = (message) => ({
  type: GET_THISWEEK_RECIPE_FAILURE,
  payload: message,
});

export const getThisMonthRecipeStart = (payload) => ({
  type: GET_THISMONTH_RECIPE_START,
  payload: payload,
});

export const getThisMonthRecipeSuccess = (data) => ({
  type: GET_THISMONTH_RECIPE_SUCCESS,
  payload: data,
});

export const getThisMonthRecipeFailure = (message) => ({
  type: GET_THISMONTH_RECIPE_FAILURE,
  payload: message,
});

export const resetThisMonthRecipeState = () => ({
  type: RESET_THISMONTH_RECIPE_STATE,
});
