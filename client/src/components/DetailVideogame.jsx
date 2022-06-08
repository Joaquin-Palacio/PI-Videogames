import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsVideogame } from "../actions/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CardDetail from "./CardDetail";
import "./styles/detailsGame.css";

export default function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetailsVideogame(id));
  }, [dispatch, id]);

  const videogame = useSelector((state) => state.details);

  return (
    <div>
      <CardDetail
        id={videogame.id}
        name={videogame.name}
        description={videogame.description}
        rating={videogame.rating}
        released={videogame.released}
        image={videogame.image}
        genres={videogame.genres}
        platforms={videogame.platforms}
      />
    </div>
  );
}
