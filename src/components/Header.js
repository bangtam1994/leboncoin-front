import React, { useState } from "react";
import logo from "../images/logo-leboncoin.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function Header(props) {
  //States

  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //fonction pour rediriger vers homepage
  let history = useHistory();

  // fonction pour submit connexion de la modal
  const handleConnexion = async (event) => {
    event.preventDefault();

    setModal(false);

    await axios
      .post(
        "https://leboncoin-api.herokuapp.com/user/log_in",

        {
          email: email,
          password: password,
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.data.message === "User not found") {
          alert("Cet utilisateur n'existe pas");
        } else {
          //J'enregistre mon token dans mes cookies
          const token = response.data.token;
          console.log("your login token is", token);
          Cookies.set("token", token, { expires: 7 });

          // Je remplace le bouton "se connecter" par "se déconnecter"
          props.setUser({ token: token });
          history.push("/");
        }
      })
      .catch(function (error) {
        alert("invalid username or password");
        console.log(error);
      });
  };

  return (
    <header>
      <div className="container">
        <div className="header-left d-flex flex2">
          <Link to="/">
            <img src={logo} alt="Logo Leboncoin" className="logo-leboncoin" />{" "}
          </Link>
          <button
            onClick={() => {
              if (props.user !== null) {
                history.push("/publish");
              } else {
                setModal(true);
              }
            }}
          >
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
          {/* LOGIN  */}
          <div
            className="loginModal"
            onClick={() => {
              setModal(true);
            }}
          >
            <FontAwesomeIcon icon="sign-in-alt" className="sign-in-modal" />
          </div>

          <div className="login">
            <FontAwesomeIcon icon="user" />
            {props.user === null ? (
              <Link to="/user/log_in">
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

      {/* MODAL DU LOGIN */}
      {modal === true && (
        <div
          className="modal"
          onClick={(event) => {
            if (event.target.className === "modal") {
              setModal(false);
            }
          }}
        >
          <div className="whiteblock">
            <form onSubmit={handleConnexion}>
              <h2> Connexion </h2>
              <hr />
              <p> Adresse email</p>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />

              <p> Mot de Passe</p>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <br />
              {/* Bouton pour se connecter  */}
              <input
                className="modal-btn-login"
                type="submit"
                value="Se connecter"
              />
            </form>

            {/* formulaire pour redigirer vers signup  */}
            <form>
              <p>Vous n'avez pas de compte ?</p>
              <Link to="/user/sign_up">
                <input
                  className="modal-btn-login"
                  type="submit"
                  value="Créer un compte"
                  onClick={() => {
                    setModal(false);
                  }}
                />
              </Link>
            </form>
            {/* Pour fermer la modale  */}
            <FontAwesomeIcon
              icon="times-circle"
              className="modalCloseBtn"
              onClick={() => {
                setModal(false);
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
