import React from "react";
import logo from "../images/logo-leboncoin.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

function Header(props) {
  const history = useHistory();
  return (
    <header>
      <div className="container">
        <div className="header-left d-flex flex2">
          <Link to="/">
            <img src={logo} alt="Logo Leboncoin" className="logo-leboncoin" />{" "}
          </Link>
          <button>
            <FontAwesomeIcon icon="plus-square" className="icon-plus" />
            Déposer une annonce
          </button>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <div className="search">
              <FontAwesomeIcon icon="search" className="icon-search" />{" "}
              Rechercher
            </div>
          </Link>
        </div>

        <div className="header-right flex1">
          <div className="login">
            <FontAwesomeIcon icon="user" />
            {props.user === null ? (
              <Link to="/login">
                <div>Se connecter </div>
              </Link>
            ) : (
              <div
                onClick={() => {
                  Cookies.remove("token");
                  props.setUser(null);
                  history.push("/");
                }}
              >
                Se déconnecter
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
