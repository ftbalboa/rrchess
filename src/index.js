import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Nav } from "./components/Nav/Nav";
import About from "./About";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import { Route, HashRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route path="/" component={Nav} />
        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
