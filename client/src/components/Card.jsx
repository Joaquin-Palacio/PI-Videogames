import React from "react";
import "./styles/Card.css";

export default function Card({ name, image, genres  }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      {genres?.map(e => {
        if(typeof(e) === 'string'){
          return (
            <div key={e}>
              <span>{e}</span>
            </div>
          )
        } else {
          return (
            <div key={e.name}>
              <span>{e.name}</span>
            </div>
          )
        }
      })}
      <img className="image" src={image} alt="No se pudo cargar la imagen del juego" />
    </div>
  );
}
