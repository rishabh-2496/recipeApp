import { loginSuccess, loginFailure } from "./actions";
import { takeEvery, call, put } from "redux-saga/effects";
import registerApi from "./api";
import { LOGIN_START } from "./constants";
import { saveItem } from "../../utils/genericUtils";

function* login(action) {
  try {
    const data = yield call(registerApi, action.payload);
    saveItem("token", data.data.token);
    if (data.status === 200) {
      yield put(loginSuccess(data.data));
    }
  } catch (e) {
    yield put(loginFailure(e.data.message));
  }
}

export default function* watchlogin() {
  yield takeEvery(LOGIN_START, login);
}
