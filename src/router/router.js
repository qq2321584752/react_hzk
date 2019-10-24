import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Login from "../components/login/login.js";
import Home from "../components/home/home.js";
import Detail from "../components/detail/detail.js";
import Calc from "../components/calc/calc.js";
import Map from "../components/map/map.js";

const AppRouter = () => {
  return (
    <Router>
      {/* <Link to="/login">乌拉~~</Link> */}
      {/* <Link to="/home">气死偶嘞~~</Link> */}
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/detail" component={Detail} />
        <Route path="/calc" component={Calc} />
        <Route path="/map" component={Map} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
