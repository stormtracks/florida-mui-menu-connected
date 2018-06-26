import React from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import Routes from "./../routes";
import AppChapter from "./AppChapter";

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <AppChapter />
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: PropTypes.object
};

export default App;
