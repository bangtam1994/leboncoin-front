import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container">
      {/* formulaire pour connexion  */}
      <form>
        <h2> Bonjour ! </h2>
        <p>Connectez-vous pour découvrir toutes nos fonctionnalités.</p>
        <p> Email</p>
        <input
          type="text"
          name="email"
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
        />

        <p> Mot de Passe</p>
        <input
          type="password"
          name="password"
          value={password}
          onChange={event => {
            setPassword(event.target.value);
          }}
        />
        <br />
        <input type="submit" value="Se connecter" />
      </form>

      {/* formulaire pour redigirer vers signup  */}
      <form>
        <p>Vous n'avez pas de compte ?</p>
        <Link to="/signup">
          <input type="submit" value="Créer un compte" />
        </Link>
      </form>
    </div>
  );
}

export default Login;
