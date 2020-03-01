import React from "react";
import noPictures from "../images/img-not-available.jpg";
import { Link } from "react-router-dom";
import Moment from "react-moment";

function OffersBloc({
  // pictures,
  // _id,
  // title,
  // description,
  // price,
  // creator,
  // created
  offers
}) {
  return (
    <div>
      {offers.map(offer => {
        const myLink = "/offer/" + offer._id;
        return (
          <Link
            to={myLink}
            style={{ textDecoration: "none", color: "black" }}
            id={offer._id}
          >
            <div className="offers-bloc" key={offer._id}>
              {offer.pictures.length !== 0 ? (
                <img
                  src={offer.pictures[0]}
                  alt={offer.title}
                  className="firstPic"
                />
              ) : (
                <img src={noPictures} alt="no pictures" className="picEmpty" />
              )}
              <div className="offers-bloc-details">
                <h3>{offer.title}</h3>
                {offer.price && <div className="price">{offer.price}€ </div>}
                <Moment format="DD/MM/YYYY">{offer.created}</Moment>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default OffersBloc;
