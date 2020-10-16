import { addRecipeSuccess, addRecipeFailure } from "./actions";
import { takeEvery, call, put } from "redux-saga/effects";
import addRecipeApi from "./api";
import { ADD_RECIPE_START } from "./constants";

function* addRecipe(action) {
  try {
    const data = yield call(addRecipeApi, action.payload);
    if (data.status === 200) {
      yield put(addRecipeSuccess(data.data));
    }
  } catch (e) {
    yield put(addRecipeFailure(e.data.message));
  }
}

export default function* watchAddRecipe() {
  yield takeEvery(ADD_RECIPE_START, addRecipe);
}
