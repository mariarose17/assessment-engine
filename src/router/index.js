import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
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
    </Switch>
  );
}

export default AppRouter;
