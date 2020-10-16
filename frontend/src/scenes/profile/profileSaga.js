import {
  getProfileSuccess,
  getProfileFailure,
  editProfileSuccess,
  editProfileFailure,
} from "./actions";
import { takeEvery, call, put } from "redux-saga/effects";
import { getProfileApi, editProfileApi } from "./api";
import { GET_PROFILE_START, EDIT_PROFILE_START } from "./constants";
import { saveItem } from "./../../utils/genericUtils";

function* profile(action) {
  try {
    const data = yield call(getProfileApi, action.payload);
    if (data.status === 200) {
      yield put(getProfileSuccess(data.data));
    }
  } catch (e) {
    yield put(getProfileFailure(e.data.message));
  }
}

export default function* watchProfile() {
  yield takeEvery(GET_PROFILE_START, profile);
}

function* editProfile(action) {
  try {
    const data = yield call(editProfileApi, action.payload);
    saveItem("token", data.data.user.token);
    if (data.status === 200) {
      yield put(editProfileSuccess(data.data));
    }
  } catch (e) {
    yield put(editProfileFailure(e.data.message));
  }
}

export function* watchEditProfile() {
  yield takeEvery(EDIT_PROFILE_START, editProfile);
}
