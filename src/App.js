import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Offer from "./containers/Offer";
import Offers from "./containers/Offers";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlusSquare,
  faSearch,
  faUser
} from "@fortawesome/free-solid-svg-icons";
library.add(faPlusSquare, faSearch, faUser);

function App() {
  const tokenFromCookie = Cookies.get("token");
  // let newState;
  // if (tokenFromCookie) {
  //   newState = { token: tokenFromCookie };
  // } else {
  //   newState = null;
  // }

  const [user, setUser] = useState(
    tokenFromCookie ? { token: tokenFromCookie } : null
  );

  // const [user, setUser] = useState(newState);

  return (
    <Router>
      <Header setUser={setUser} user={user} />

      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/">
          <Offers />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
