import { verificationSuccess, verificationFailure } from "./actions";
import { takeEvery, call, put } from "redux-saga/effects";
import { verificationApi } from "./api";
import { VERIFICATION_START } from "./constants";
import { saveItem } from "../../utils/genericUtils";

function* verification(action) {
  try {
    const data = yield call(verificationApi, action.payload);
    saveItem("token", data.data.user.token);
    if (data.status === 200) {
      yield put(verificationSuccess(data.data));
    }
  } catch (e) {
    yield put(verificationFailure(e.data.message));
  }
}

export default function* watchVerification() {
  yield takeEvery(VERIFICATION_START, verification);
}
