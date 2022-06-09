import React from "react";
import "./styles/Paginado.css";

export default function Paginado({
  videogamesPerPage,
  allVideogames,
  paginado,
 /*  paginadoPrev,
  paginadoNext */
}) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  /* const handlePrev = (e) => {
    e.preventDefault(e)
    paginadoPrev(1);
  }

  const handleNext = (e) => {
    e.preventDefault(e)
    paginadoNext(1);
  } */

  return (
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="number" key={number}>
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );

  {/* <nav> 
          <div>
            <button onClick={(e) => handlePrev(e)}>Prev</button>
            <button onClick={(e) => handleNext(e)}>Next</button>
          </div>
  </nav> */}
}
