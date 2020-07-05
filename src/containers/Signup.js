import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { format, parseISO } from "date-fns";
import Cookies from "js-cookie";

import "react-datepicker/dist/react-datepicker.css";

function Signup() {
  //Déclaration des states
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  //fonction pour rediriger vers homepage
  let history = useHistory();
  //fonction pour vérifier la checkbox
  const handleCheckbox = () => {
    setCheckbox(!checkbox);
  };

  //fonction quand on submit le formulaire d'inscription
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords are not matching");
    } else if (checkbox === false) {
      alert("Please accept the general conditions");
    } else {
      let parsedBirthdate = parseISO(birthdate);

      parsedBirthdate = format(parsedBirthdate, "yyyy-MM-dd");

      await axios
        .post(
          "https://leboncoin-api.herokuapp.com/user/sign_up",

          {
            username: pseudo,
            email: email,
            password: password,
            birthdate: parsedBirthdate,
          }
        )
        .then(function (response) {
          console.log("la réponse de l'api est:", response);
          const token = response.data.token;
          console.log("le token est:", token);
          if (response.data.message === "email already exist") {
            alert("Cet email est déjà utilisé");
          } else if (response.data.message === "Missing information") {
            alert("Il manque des informations pour la création du comte");
          } else {
            Cookies.set("token", token, { expires: 7 });
            history.push("/");
          }
        })
        .catch(function (error) {
          console.log(error);
          alert(error);
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
          onChange={(event) => {
            setPseudo(event.target.value);
          }}
        />
        <p> Adresse Email *</p>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <p> Date de naissance *</p>
        <input
          type="date"
          name="birthdate"
          value={birthdate}
          onChange={(event) => {
            setBirthdate(event.target.value);
          }}
        />

        <p> Mot de passe *</p>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <p> Confirmer le mot de passe *</p>
        <input
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(event) => {
            setPasswordConfirm(event.target.value);
          }}
        />
        <br />
        <div className="generalConditions">
          <input
            className="checkboxSignup"
            type="checkbox"
            onClick={handleCheckbox}
          />
          <div>
            "J'accepte les Conditions générales de Vente et les Conditions
            Générales d'utilisation"
          </div>{" "}
        </div>

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
