import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";

import { Home } from "../../components";
import { Login, Signup } from "../../components/User";

const App = props => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  );
};

export default withRouter(App);
