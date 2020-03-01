import React from "react";
import { Link } from "react-router-dom";

function Pagination({ data, postsPerPage, pages, nextPage }) {
  const pageNumbers = [];
  // Math.ceil retourne le plus petit entier supérieur ou égal au nombre donné
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  console.log(pages);
  // [1,2,3,4..]

  return (
    <div>
      <ul className="d-flex ">
        {pageNumbers.map(number => {
          return (
            <Link to={"/offers/page=" + number}>
              <li
                onClick={() => {
                  nextPage(number);
                }}
                className="pagination-number"
              >
                {" "}
                {number}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Pagination;
