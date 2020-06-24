import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noPictures from "../images/img-not-available.jpg";
import { Link, useHistory } from "react-router-dom";
import Moment from "react-moment";

function Search({
  // pictures,
  // _id,
  // title,
  // description,
  // price,
  // creator,
  // created,
  search,
  setSearch,
}) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let history = useHistory();
  //Requête au serveur
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://leboncoin-backend-by-bt.herokuapp.com/offer/with-count"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Affichage des résultats
  return (
    <>
      {isLoading === true ? (
        <div> En cours de recherche</div>
      ) : (
        <div className="offers">
          <div className="blocorange"></div>
          <div className="container">
            <div className="bloc-white-search">
              <FontAwesomeIcon icon="search" className="icon-search" />
              <input
                placeholder="Que recherchez-vous?"
                className="input-search"
                name="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
              <button
                onClick={() => {
                  return history.push("/search");
                }}
              >
                Rechercher
              </button>
            </div>

            {data.offers.map((offer) => {
              console.log("trouvé !");

              if (offer.title.indexOf(search) !== -1) {
                const {
                  pictures,
                  _id,
                  title,
                  description,
                  price,
                  creator,
                  created,
                } = offer;
                const myLink = "/offer/" + _id;
                return (
                  <>
                    <Link
                      to={myLink}
                      style={{ textDecoration: "none", color: "black" }}
                      id={_id}
                    >
                      <div className="offers-bloc" key={_id}>
                        {pictures.length !== 0 ? (
                          <img
                            src={pictures[0]}
                            alt={title}
                            className="firstPic"
                          />
                        ) : (
                          <img
                            src={noPictures}
                            alt="no pictures"
                            className="picEmpty"
                          />
                        )}
                        <div className="offers-bloc-details">
                          <h3>{title}</h3>
                          {price && <div className="price">{price}€ </div>}
                          <Moment format="DD/MM/YYYY">{created}</Moment>
                        </div>
                      </div>
                    </Link>{" "}
                  </>
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
