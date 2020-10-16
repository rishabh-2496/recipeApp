import { takeEvery, call, put } from "redux-saga/effects";
import { resetPasswordApi } from "./api";
import { RESET_PASSWORD_START } from "./constants";
import { resetPasswordSuccess, resetPasswordFailure } from "./actions";

function* resetPassword(action) {
  try {
    const data = yield call(resetPasswordApi, action.payload);
    if (data.status === 200) {
      yield put(resetPasswordSuccess(data.data));
    }
  } catch (e) {
    yield put(resetPasswordFailure(e.data.message));
  }
}

export default function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD_START, resetPassword);
}
