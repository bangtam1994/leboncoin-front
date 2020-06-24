import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Login(props) {
  // Déclaration des states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //fonction pour rediriger vers homepage
  let history = useHistory();

  // fonction pour submit connexion
  const handleConnexion = async (event) => {
    event.preventDefault();
    await axios
      .post(
        "https://leboncoin-api.herokuapp.com/api/user/log_in",

        {
          email: email,
          password: password,
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.data.message === "User not found") {
          alert("Cet utilisateur n'existe pas");
        } else if (response.data.message === "Access denied") {
          alert("Username or password incorrect");
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
    <div className="container login">
      {/* formulaire pour connexion  */}
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
        <input className="btn-login" type="submit" value="Se connecter" />
      </form>

      {/* formulaire pour redigirer vers signup  */}
      <form>
        <p>Vous n'avez pas de compte ?</p>
        <Link to="/user/sign_up">
          <input className="btn-login" type="submit" value="Créer un compte" />
        </Link>
      </form>
    </div>
  );
}

export default Login;
