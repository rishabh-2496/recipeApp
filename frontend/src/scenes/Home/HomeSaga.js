import {
  getAllTimeRecipeSuccess,
  getAllTimeRecipeFailure,
  getTodayRecipeSuccess,
  getTodayRecipeFailure,
  getThisWeekRecipeSuccess,
  getThisWeekRecipeFailure,
  getThisMonthRecipeSuccess,
  getThisMonthRecipeFailure,
} from "./actions";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  allTimeRecipeApi,
  todayRecipeApi,
  thisWeekRecipeApi,
  thisMonthRecipeApi,
} from "./api";
import {
  GET_ALLTIME_RECIPE_START,
  GET_TODAY_RECIPE_START,
  GET_THISWEEK_RECIPE_START,
  GET_THISMONTH_RECIPE_START,
} from "./constants";

//===========allTimeRecipe============///

function* allTimeRecipe(action) {
  try {
    const data = yield call(allTimeRecipeApi, action.payload);
    if (data.status === 200) {
      yield put(getAllTimeRecipeSuccess(data.data));
    }
  } catch (e) {
    yield put(getAllTimeRecipeFailure(e.data.message));
  }
}

export default function* watchAllTimeRecipe() {
  yield takeEvery(GET_ALLTIME_RECIPE_START, allTimeRecipe);
}

//===========todayRecipe============///

function* todayRecipe(action) {
  try {
    const data = yield call(todayRecipeApi, action.payload);
    if (data.status === 200) {
      yield put(getTodayRecipeSuccess(data.data));
    }
  } catch (e) {
    yield put(getTodayRecipeFailure(e.data.message));
  }
}

export function* watchTodayRecipe() {
  yield takeEvery(GET_TODAY_RECIPE_START, todayRecipe);
}

//===========thisWeek============///

function* thisWeekRecipe(action) {
  try {
    const data = yield call(thisWeekRecipeApi, action.payload);
    if (data.status === 200) {
      yield put(getThisWeekRecipeSuccess(data.data));
    }
  } catch (e) {
    yield put(getThisWeekRecipeFailure(e.data.message));
  }
}

export function* watchThisWeekRecipe() {
  yield takeEvery(GET_THISWEEK_RECIPE_START, thisWeekRecipe);
}

//===========thisMonth============///

function* thisMonthRecipe(action) {
  try {
    const data = yield call(thisMonthRecipeApi, action.payload);
    if (data.status === 200) {
      yield put(getThisMonthRecipeSuccess(data.data));
    }
  } catch (e) {
    yield put(getThisMonthRecipeFailure(e.data.message));
  }
}

export function* watchThisMonthRecipe() {
  yield takeEvery(GET_THISMONTH_RECIPE_START, thisMonthRecipe);
}
