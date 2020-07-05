import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "nuka-carousel";
import Moment from "react-moment";
import noPictures from "../images/img-not-available.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import { useParams } from "react-router-dom";

function Offer(props) {
  const params = useParams();
  const { id } = params;
  const [offer, setOffer] = useState({});
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const myLink = "https://leboncoin-api.herokuapp.com/offer/" + id;

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

  const fetchData = async () => {
    try {
      const response = await axios.get(myLink);
      setOffer(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <>
      {isLoading === true ? (
        <div> En cours de chargement</div>
      ) : (
        <div className="offer container d-flex">
          <div className="blocLeft flex3">
            {offer & offer.pictures && offer.pictures.length !== 0 ? (
              offer.pictures.length === 1 ? (
                <img
                  src={offer.pictures[0]}
                  alt={offer.title}
                  className="offerPic"
                />
              ) : (
                <div className="carousel">
                  <Carousel
                    wrapAround={true}
                    renderCenterLeftControls={({ previousSlide }) => (
                      <div onClick={previousSlide} className="carouselButton">
                        <FontAwesomeIcon
                          icon="chevron-left"
                          className="carousel-left"
                        />
                      </div>
                    )}
                    renderCenterRightControls={({ nextSlide }) => (
                      <div onClick={nextSlide} className="carouselButton">
                        <FontAwesomeIcon
                          icon="chevron-right"
                          className="carousel-right"
                        />
                      </div>
                    )}
                  >
                    {offer.pictures.map((elem, index) => {
                      return (
                        <img
                          src={elem}
                          alt={offer.title}
                          className="offerPic"
                          key={offer.title}
                        />
                      );
                    })}
                  </Carousel>
                </div>
              )
            ) : (
              <img src={noPictures} alt="nopic" className="picEmpty" />
            )}

            <div className="offerDetails">
              <h2> {offer.title}</h2>
              <div> {offer.price} €</div>
              <div>
                <Moment format="DD/MM/YYYY">{offer.created}</Moment>
              </div>
            </div>

            <div className="offerDescription">
              <h3>Description</h3>
              <br /> {offer.description}
            </div>
          </div>
          <div className="blocRight flex1">
            <div className="offerUserDetails">
              <h2>{offer.creator.account.username}</h2>
              <div>X annonces en ligne</div>
            </div>
            <br />
            <button
              onClick={() => {
                props.token
                  ? history.push("/payment", {
                      title: offer.title,
                      price: offer.price,
                      picture: offer.pictures,
                    })
                  : setModal(true);
              }}
            >
              {" "}
              Acheter{" "}
            </button>

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
          </div>
        </div>
      )}
    </>
  );
}

export default Offer;
