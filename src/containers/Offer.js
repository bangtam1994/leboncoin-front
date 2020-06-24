import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "nuka-carousel";
import Moment from "react-moment";
import noPictures from "../images/img-not-available.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";

import { useParams } from "react-router-dom";

function Offer(props) {
  const params = useParams();
  const { id } = params;
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const myLink = "https://leboncoin-api.herokuapp.com/api/offer/" + id;

  console.log(myLink);

  const fetchData = async () => {
    try {
      console.log(id);
      const response = await axios.get(myLink);
      setOffer(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(offer.pictures);

  return (
    <>
      {/* {offer.title}
      {offer.description}
      {offer.price} */}

      {isLoading === true ? (
        <div> En cours de chargement</div>
      ) : (
        <div className="offer container d-flex">
          <div className="blocLeft flex3">
            {offer.pictures.length !== 0 ? (
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
                {
                  props.token
                    ? history.push("/payment", {
                        title: offer.title,
                        price: offer.price,
                        picture: offer.pictures,
                      })
                    : alert("Veuillez vous connecter pour acheter");
                }
              }}
            >
              {" "}
              Acheter{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Offer;
