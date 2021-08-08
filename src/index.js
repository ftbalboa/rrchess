import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Nav } from "./components/Nav/Nav";
import About from "./About";
import Db from "./components/Db/Db";
import { Detail } from "./components/Detail/Detail";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import { Route, HashRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Footer } from "./components/Footer/Footer";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Container>
      <Router>
        <Route path="/" component={Nav} />
        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/database" component={Db} />
        <Route
          exact
          path="/detail/:gameIndex"
          render={({ match }) => <Detail gameIndex={match.params.gameIndex} />}
        />
        <Route path="/" component={Footer} />
      </Router>
      </Container>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
