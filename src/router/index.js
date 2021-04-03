import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Questions from "../pages/Questions";
import Login from "../pages/Login";
import Result from "../pages/Result";
import Assessment from "../pages/Assessment";

function AppRouter() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/assessment">
        <Assessment />
      </Route>
      <Route exact path="/result">
        <Result />
      </Route>
    </Switch>
  );
}

export default AppRouter;
