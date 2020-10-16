import { takeEvery, call, put } from "redux-saga/effects";
import { forgotPasswordApi } from "./api";
import { FORGOT_PASSWORD_START } from "./constants";
import { forgotPasswordSuccess, forgotPasswordFailure } from "./actions";

function* forgotPassword(action) {
  try {
    const data = yield call(forgotPasswordApi, action.payload);
    if (data.status === 200) {
      yield put(forgotPasswordSuccess(data.data));
    }
  } catch (e) {
    yield put(forgotPasswordFailure(e.data.message));
  }
}

export default function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD_START, forgotPassword);
}
