import React from "react";
import {Route, Switch} from "react-router-dom";
import MainScreen from "../main-screen/main-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import {AppRoute} from "../../const";
import LoginScreen from "../login-screen/login-screen";
import SignupScreen from "../signup-screen/signup-screen";

/**
 * Component for app.
 * @component
 * @example
 * return (
 *   <App />
 * )
 * @return {function}
 */
const App = () => {
  return (
    <Switch>
      <Route
        exact
        path={AppRoute.MAIN}
        render={() => <MainScreen />}
      />
      <Route
        exact
        path={AppRoute.LOGIN}
        render={() => <LoginScreen />}
      />
      <Route
        exact
        path={AppRoute.SIGNUP}
        render={() => <SignupScreen />}
      />
      <Route render={() => <NotFoundScreen />} />
    </Switch>
  );
};

export default App;
