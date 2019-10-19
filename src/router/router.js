import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Login from "../components/login/login.js";
import Home from "../components/home/home.js";

const AppRouter = () => {
  return (
    <Router>
      {/* <Link to="/login">乌拉~~</Link> */}
      {/* <Link to="/home">气死偶嘞~~</Link> */}
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
