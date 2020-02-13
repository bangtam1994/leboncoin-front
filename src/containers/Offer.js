import React, { useState, useEffect } from "react";
import axios from "axios";
import noPictures from "../images/img-not-available.svg";

import { useParams } from "react-router-dom";

function Offer(props) {
  const params = useParams();
  const { id } = params;
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const myLink = "https://leboncoin-api.herokuapp.com/api/offer/" + id;
  console.log(myLink);

  const fetchData = async () => {
    try {
      console.log(id);
      console.log(1);
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
            {offer.pictures ? (
              <div>
                {offer.pictures.map((elem, index) => {
                  return (
                    <img src={elem} alt={offer.title} className="offerPic" />
                  );
                })}
              </div>
            ) : (
              <img src={noPictures} alt="nopic" className="picEmpty" />
            )}

            <div className="offerDetails">
              <h2> {offer.title}</h2>
              <div> {offer.price} €</div>
              <div> {offer.created} </div>
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
            <button> Acheter </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Offer;
