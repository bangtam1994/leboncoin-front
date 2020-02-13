import React from "react";
import logo from "../images/logo-leboncoin.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="container">
        <div className="header-left d-flex flex2">
          <img src={logo} alt="Logo Leboncoin" className="logo-leboncoin" />
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
          <div className="login ">
            <FontAwesomeIcon icon="user" />
            <div>Se connecter </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
