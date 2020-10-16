import {
  postCommentSuccess,
  postCommentFailure,
  getCommentSuccess,
  getCommentFailure,
} from "./actions";
import { takeEvery, call, put } from "redux-saga/effects";
import { postCommentApi, getCommentsApi } from "./api";
import { POST_COMMENT_START, GET_COMMENT_START } from "./constants";

//===== post comment saga ======

function* postComment(action) {
  try {
    const data = yield call(postCommentApi, action.payload);
    if (data.status === 200) {
      yield put(postCommentSuccess(data.data));
    }
  } catch (e) {
    yield put(postCommentFailure(e.data.message));
  }
}

export default function* watchPostComment() {
  yield takeEvery(POST_COMMENT_START, postComment);
}

//========= get comment saga =============

function* getComments(action) {
  try {
    const data = yield call(getCommentsApi, action.payload);
    if (data.status === 200) {
      yield put(getCommentSuccess(data.data));
    }
  } catch (e) {
    yield put(getCommentFailure(e.data.message));
  }
}

export function* watchGetComments() {
  yield takeEvery(GET_COMMENT_START, getComments);
}
