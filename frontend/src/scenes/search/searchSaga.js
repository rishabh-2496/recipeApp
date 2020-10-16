import { searchSuccess, searchFailure } from "./actions";
import { takeEvery, call, put } from "redux-saga/effects";
import SearchApi from "./api";
import { SEARCH_START } from "./constants";

function* search(action) {
  try {
    const data = yield call(SearchApi, action.payload);
    if (data.status === 200) {
      yield put(searchSuccess(data.data));
    }
  } catch (e) {
    yield put(searchFailure(e.data.message));
  }
}

export default function* watchSearch() {
  yield takeEvery(SEARCH_START, search);
}
