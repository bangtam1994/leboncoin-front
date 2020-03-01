import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Publish from "./containers/Publish";
import Offer from "./containers/Offer";
import Offers from "./containers/Offers";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Search from "./containers/Search";
import Payment from "./containers/Payment";

import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlusSquare,
  faSearch,
  faUser,
  faTimesCircle,
  faSignInAlt,
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faPlusSquare,
  faSearch,
  faUser,
  faTimesCircle,
  faSignInAlt,
  faChevronRight,
  faChevronLeft
);

function App() {
  //Va gérer l'état du cookie (présent ou non)
  const tokenFromCookie = Cookies.get("token");
  const [user, setUser] = useState(
    tokenFromCookie ? { token: tokenFromCookie } : null
  );
  //Pour l'état de la recherche
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setUser={setUser} user={user} />
      <main>
        <div className="content-wrap">
          <Switch>
            <Route path="/offer/:id">
              <Offer token={tokenFromCookie} />
            </Route>
            <Route path="/payment">
              <Payment />
            </Route>

            <Route path="/user/log_in">
              <Login setUser={setUser} />
            </Route>
            <Route path="/user/sign_up">
              <Signup />
            </Route>
            <Route path="/publish">
              <Publish token={tokenFromCookie} />
            </Route>
            <Route path="/search">
              <Search search={search} setSearch={setSearch} />
            </Route>
            <Route path="/">
              <Offers search={search} setSearch={setSearch} />
            </Route>
          </Switch>
        </div>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
