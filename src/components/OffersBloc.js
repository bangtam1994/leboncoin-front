import React from "react";
import noPictures from "../images/img-not-available.jpg";
import { Link } from "react-router-dom";
import Moment from "react-moment";

function OffersBloc({
  pictures,
  _id,
  title,
  description,
  price,
  creator,
  created
}) {
  const myLink = "/offer/" + _id;

  return (
    <Link
      to={myLink}
      style={{ textDecoration: "none", color: "black" }}
      id={_id}
    >
      <div className="offers-bloc" key={_id}>
        {pictures.length !== 0 ? (
          <img src={pictures[0]} alt={title} className="firstPic" />
        ) : (
          <img src={noPictures} alt="no pictures" className="picEmpty" />
        )}
        <div className="offers-bloc-details">
          <h3>{title}</h3>
          {price && <div className="price">{price}€ </div>}
          <Moment format="DD/MM/YYYY">{created}</Moment>
        </div>
      </div>
    </Link>
  );
}

export default OffersBloc;
