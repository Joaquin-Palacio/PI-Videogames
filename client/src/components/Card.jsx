import React from "react";
import "./styles/Card.css";

export default function Card({ name, image, genres  }) {
  return (
    <div className="card">
      <h2 className="name">{name}</h2>
      <h4 className="h4Card">Géneros: </h4>
      {genres?.map(e => {
        if(typeof(e) === 'string'){
          return (   
            <div className="spanCard">
              <span key={e.name}>{e}</span>
            </div>
          )
        } else {
          return (  
            <div className="spanCard">
              <span key={e.name}>{e.name}</span>                  
            </div>   
          )
        }
      })}
      <img className="image" src={image} alt="No se pudo cargar la imagen del juego" />
    </div>
  );
}
