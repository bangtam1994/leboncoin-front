import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

function Signup() {
  //Déclaration des states
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  //fonction pour vérifier la checkbox
  const handleCheckbox = () => {
    setCheckbox(!checkbox);
  };

  //fonction pour rediriger vers homepage
  let history = useHistory();

  //fonction quand on submit le formulaire d'inscription
  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords are not matching");
    } else if (checkbox === false) {
      alert("Please accept the general conditions");
    } else {
      await axios
        .post("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
          username: pseudo,
          email: email,
          password: password
        })
        .then(function(response) {
          console.log(response);
          const token = response.data.token;
          console.log(token);
          Cookies.set("token", token, { expires: 7 });
          history.push("/");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="signup container">
      <form onSubmit={handleSubmit}>
        <h2> Créer un compte </h2>
        <hr />
        <p>Pseudo *</p>
        <input
          type="text"
          name="pseudo"
          value={pseudo}
          onChange={event => {
            setPseudo(event.target.value);
          }}
        />
        <p> Adresse Email *</p>
        <input
          type="text"
          name="email"
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
        />
        <p> Mot de passe *</p>
        <input
          type="password"
          name="password"
          value={password}
          onChange={event => {
            setPassword(event.target.value);
          }}
        />
        <p> Confirmer le mot de passe *</p>
        <input
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={event => {
            setPasswordConfirm(event.target.value);
          }}
        />
        <br />
        <input type="checkbox" onClick={handleCheckbox} />
        <span>
          "J'accepte les Conditions générales de Vente et les Conditions
          Générales d'utilisation"
        </span>
        <br />

        {/* Bouton creer mon compte  */}
        <input
          className="btn-signup"
          type="submit"
          value="Créer mon compte personnel"
        />
      </form>
    </div>
  );
}

export default Signup;
