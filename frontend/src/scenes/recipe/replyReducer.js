import { createReducer } from "./../../utils/reducerUtil";
import {
  POST_REPLY_START,
  POST_REPLY_SUCCESS,
  POST_REPLY_FAILURE,
} from "./constants";

const intialState = {
  postReplyLoading: false,
  postRepliesFailure: false,
  postRepliesFailureMessage: "",
  repliesData: {},
};

const postReplyStart = (state) => ({
  ...state,
  postReplyLoading: true,
  postRepliesFailure: false,
  postRepliesFailureMessage: "",
  repliesData: {},
});

const postReplySuccess = (state, payload) => ({
  ...state,
  postReplyLoading: false,
  postRepliesFailure: false,
  postRepliesFailureMessage: "",
  repliesData: payload,
});

const postReplyFailure = (state, payload) => ({
  ...state,
  postReplyLoading: false,
  postRepliesFailure: true,
  postRepliesFailureMessage: payload,
  repliesData: {},
});

export default createReducer(intialState, {
  [POST_REPLY_START]: postReplyStart,
  [POST_REPLY_SUCCESS]: postReplySuccess,
  [POST_REPLY_FAILURE]: postReplyFailure,
});
