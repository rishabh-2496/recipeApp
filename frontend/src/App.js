import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind.macro";
import Login from "./scenes/login/login";
import Profile from "./scenes/profile/Profile";
import Register from "./scenes/register/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./scenes/Home/Home";
import EditProfile from "./scenes/profile/EditProfile";
import RecipeDetail from "./scenes/recipe/RecipeDetail";
import AddRecipe from "./scenes/recipe/AddRecipe";
import ForgotPassword from "./scenes/login/forgotPassword";
import ResetPassword from "./scenes/login/resetPassword";
import VerifyAccount from "./scenes/register/verifyAccount";
import NotFound from "./scenes/NotFound/NotFound";
import { getCurrentUser } from "./services/httpService";
import Logout from "./components/logout";
import Search from "./scenes/search/Search";
import ProtectedRoute from "./components/common/protectedRoute";

const Container = styled.div`
  ${tw` h-screen `}
`;

const App = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, []);

  return (
    <Container>
      <ToastContainer />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} user={user} />}
        ></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route
          exact
          path="/profile/:id"
          render={(props) => <Profile {...props} user={user} />}
        ></Route>
        <ProtectedRoute exact path="/editProfile/:id" component={EditProfile} />
        <Route
          exact
          path="/recipe/:id"
          render={(props) => <RecipeDetail {...props} user={user} />}
        ></Route>
        <ProtectedRoute exact path="/postRecipe" component={AddRecipe} />
        <Route exact path="/forgotPassword" component={ForgotPassword}></Route>
        <Route
          exact
          path="/resetPassword/:token"
          component={ResetPassword}
        ></Route>
        <Route
          exact
          path="/verifyAccount/:token"
          component={VerifyAccount}
        ></Route>
        <Route exact path="/search" component={Search}></Route>
        <Route exact path="/logout" component={Logout} />
        <Route path="/" component={NotFound}></Route>
        <Redirect from="/home" to="/"></Redirect>
      </Switch>
    </Container>
  );
};

export default App;
