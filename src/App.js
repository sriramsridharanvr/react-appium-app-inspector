import React from "react";
import { connect } from "react-redux";
import TopNav from "./components/TopNav";
import Inspector from "./components/Inspector";
import { Route, Switch } from "react-router-dom";
import { resize } from "./store/actions/layoutActions";
const App = ({ resize }) => {
  React.useEffect(() => {
    resize();
    window.addEventListener("resize", () => {
      resize();
    });
  }, []);
  return (
    <React.Fragment>
      <TopNav />
      <Switch>
        <Route exact path="/" component={Inspector} />
        <Route path="/:sessionId" component={Inspector} />
      </Switch>
    </React.Fragment>
  );
};

export default connect(null, { resize })(App);
