import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetailsVideogame } from "../actions/actions";
import "./styles/CardDetail.css";

export default function CardDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();


  useEffect(() => {
    dispatch(getDetailsVideogame(id));
  }, [dispatch, id]);



  const videogame = useSelector((state) => state.details);

  return (
    <div>
      <div className="allCard">
        {videogame.id == id ? (
          <div>
            <div>
              <img
                src={videogame.image}
                className="imageDetail"
                alt="Imagen del jueego"
              />
              <br></br>
              <h1>{videogame.name}</h1>
              <h3>Genres:</h3>
              {videogame.genres?.map((e) => {
                if (typeof e === "string") {
                  return (
                    <span className="type" key={e}>
                      {e.replace(e[0], e[0].toUpperCase())} |{" "}
                    </span>
                  );
                } else {
                  return <span key={e.name}>{e.name} | </span>;
                }
              })}
              <h3>Platforms:</h3>
              {videogame.platforms?.map((e) => {
                if (typeof e === "string") {
                  return (
                    <span className="type" key={e}>
                      {e.replace(e[0], e[0].toUpperCase())} |{" "}
                    </span>
                  );
                } else {
                  return <span key={e.name}>{e.name} | </span>;
                }
              })}
            </div>
            <div>
              <div>
                <h4>
                  Released <br /> {videogame.released}
                </h4>

                <h3>
                  Rating <br /> {videogame.rating}
                </h3>

                <p className="descripcion">
                  {videogame.description.replace(/<[^>]+>/g, "")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <img classnName="loading" src="https://i.stack.imgur.com/87Tpa.gif"/>
          </div>
        )}  
      </div>
      <Link to="/home">
        <button className="botonVolver">Return to Main Page</button>
      </Link>
    </div>
  );
}
