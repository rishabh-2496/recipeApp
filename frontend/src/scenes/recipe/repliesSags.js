import { postReplySuccess, postReplyFailure } from "./actions";
import { takeEvery, call, put } from "redux-saga/effects";
import { postReplyApi } from "./api";
import { POST_REPLY_START } from "./constants";

//===== post reply saga ======

function* postReply(action) {
  try {
    const data = yield call(postReplyApi, action.payload);
    if (data.status === 200) {
      yield put(postReplySuccess(data.data));
    }
  } catch (e) {
    yield put(postReplyFailure(e.data.message));
  }
}

export default function* watchPostReply() {
  yield takeEvery(POST_REPLY_START, postReply);
}
