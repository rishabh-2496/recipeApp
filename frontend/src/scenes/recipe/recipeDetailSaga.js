import { getRecipeDetailSuccess, getRecipeDetailFailure } from "./actions";
import { takeEvery, call, put } from "redux-saga/effects";
import { getRecipeDetailApi } from "./api";
import { GET_RECIPE_DETAIL_START } from "./constants";

//===== post reply saga ======

function* getRecipeDetail(action) {
  try {
    const data = yield call(getRecipeDetailApi, action.payload);
    if (data.status === 200) {
      yield put(getRecipeDetailSuccess(data.data));
    }
  } catch (e) {
    yield put(getRecipeDetailFailure(e.data.message));
  }
}

export default function* watchGetRecipeDetail() {
  yield takeEvery(GET_RECIPE_DETAIL_START, getRecipeDetail);
}
