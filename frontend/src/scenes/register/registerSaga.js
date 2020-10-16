import { registerationSuccess, registerationFailure } from "./actions";
import { takeEvery, call, put } from "redux-saga/effects";
import registerApi from "./api";
import { REGISTRATION_START } from "./constants";

function* registeration(action) {
  try {
    const data = yield call(registerApi, action.payload);
    if (data.status === 200) {
      yield put(registerationSuccess(data.data));
    }
  } catch (e) {
    yield put(registerationFailure(e.data.message));
  }
}

export default function* watchRegisteration() {
  yield takeEvery(REGISTRATION_START, registeration);
}
