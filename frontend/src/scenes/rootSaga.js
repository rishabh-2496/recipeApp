import { all } from "redux-saga/effects";
import watchRegisteration from "./register/registerSaga";
import watchVerification from "./register/verificationSaga";
import watchlogin from "./login/loginSaga";
import watchForgotPassword from "./login/forgotPasswordSaga";
import watchResetPassword from "./login/resetPasswordSaga";
import watchAddRecipe from "./recipe/addRecipeSaga";
import watchAllTimeRecipe, {
  watchTodayRecipe,
  watchThisWeekRecipe,
  watchThisMonthRecipe,
} from "./Home/HomeSaga";
import watchPostComment, { watchGetComments } from "./recipe/commentSaga";
import watchPostReply from "./recipe/repliesSags";
import watchProfile, { watchEditProfile } from "./profile/profileSaga";
import watchSearch from "./search/searchSaga";
import watchGetRecipeDetail from "./recipe/recipeDetailSaga";

export default function* rootSaga() {
  yield all([
    watchRegisteration(),
    watchVerification(),
    watchlogin(),
    watchForgotPassword(),
    watchResetPassword(),
    watchAddRecipe(),
    watchAllTimeRecipe(),
    watchTodayRecipe(),
    watchThisWeekRecipe(),
    watchThisMonthRecipe(),
    watchGetComments(),
    watchPostComment(),
    watchPostReply(),
    watchProfile(),
    watchEditProfile(),
    watchSearch(),
    watchGetRecipeDetail(),
  ]);
}
