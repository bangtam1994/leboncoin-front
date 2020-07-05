import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import OffersBloc from "../components/OffersBloc";

function Offers({ search, setSearch }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();
  // Pagination
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(10);
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // const numberPages = Math.ceil(data.count / 20);
  console.log(data.count);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://leboncoin-api.herokuapp.com/offer/with-count"
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

  // //Change page

  // const nextPage = async numberPage => {
  //   try {
  //     const response = await axios.get(
  //       `https://leboncoin-api-final.herokuapp.com/api/offer/with-count?skip=25&limit=25`
  //     );
  //     setData(response.data);
  //     setCurrentPage(numberPage);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

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
            {/* détails des offres  */}

            <OffersBloc offers={data.offers} />

            {/* <Pagination
              data={data}
              currentPage={currentPage}
              pages={numberPages}
              nextPage={nextPage}
            /> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Offers;
