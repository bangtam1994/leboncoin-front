import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Offer from "./containers/Offer";
import Offers from "./containers/Offers";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlusSquare,
  faSearch,
  faUser
} from "@fortawesome/free-solid-svg-icons";
library.add(faPlusSquare, faSearch, faUser);

function App() {
  return (
    <div>
      <Router>
        <Header />

        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>

          <Route path="/">
            <Offers />
          </Route>
        </Switch>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
