import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsVideogame } from "../actions/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CardDetail from "./CardDetail";
import './styles/detailsGame.css';


export default function Details(){
    const dispatch = useDispatch();
    const { id }  = useParams()
    useEffect(() => {
        dispatch(getDetailsVideogame(id));
    }, [dispatch, id]);

    const videogame = useSelector((state) => state.details)

    console.log(videogame)
    return (
     <div>
        <Link to="/home">
          <button>Volver a la Página Principal</button>
        </Link>
         <CardDetail
         name = {videogame.name} 
         description = {videogame.description} 
         rating = {videogame.rating} 
         released = {videogame.released} 
         image = {videogame.image} 
         genres = {videogame.genres}
         platforms = {videogame.platforms}
         />
         <br/>
      </div> 
    );
}