import { combineReducers } from "redux";
import register from "../scenes/register/registerReducer";
import verification from "../scenes/register/verificationReducer";
import login from "../scenes/login/loginReducer";
import forgotPassword from "../scenes/login/forgotPasswordReducer";
import resetPassword from "../scenes/login/resetPasswordReducer";
import addRecipe from "../scenes/recipe/AddRecipeReducer";
import allTimeRecipe from "../scenes/Home/allTimeReducer";
import todayRecipe from "../scenes/Home/todayReducer";
import thisWeekRecipe from "../scenes/Home/thisWeekReducer";
import thisMonthRecipe from "../scenes/Home/thisMonthReducer";
import comments from "../scenes/recipe/commentsReducer";
import replies from "../scenes/recipe/replyReducer";
import profile from "../scenes/profile/profileReducer";
import editProfile from "../scenes/profile/editProfileReducer";
import search from "../scenes/search/searchReducer";
import recipeDetail from "../scenes/recipe/recipeDetailReducer";

const rootReducer = combineReducers({
  register,
  verification,
  login,
  forgotPassword,
  resetPassword,
  addRecipe,
  allTimeRecipe,
  todayRecipe,
  thisWeekRecipe,
  thisMonthRecipe,
  comments,
  replies,
  profile,
  editProfile,
  search,
  recipeDetail,
});

export default rootReducer;
