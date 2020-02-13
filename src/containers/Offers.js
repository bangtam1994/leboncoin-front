import React, { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import OffersBloc from "../components/OffersBloc";

function Offers() {
  const [data, setData] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://leboncoin-api.herokuapp.com/api/offer/with-count"
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

  return (
    <>
      {isLoading === true ? (
        <div> En cours de chargement</div>
      ) : (
        <div className="offers">
          {/*  Bloc de recherche  */}

          <div className="blocorange"></div>
          <div className="container">
            <div className="bloc-white-search">
              <FontAwesomeIcon icon="search" className="icon-search" />
              <input
                placeholder="Que recherchez-vous?"
                className="input-search"
              />
              <button>Rechercher</button>
            </div>

            {/* détails des offres  */}

            {data.offers.map(offer => {
              return <OffersBloc {...offer} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Offers;
