import React from "react";
import './styles/Card.css'

export default function Card({ name, image, genres  }) {
  return (
    <div className="CardHome">
      <h2 className="name">{name}</h2>
      <h4 className="h4Card">Genres: </h4>
      {genres?.map(e => {
        if(typeof(e) === 'string'){
          return (  
              <span key={e}>{e}</span>
          )
        } else {
          return (  
              <span key={e.name}>{e.name}</span>                   
          )
        }
      })}
      <img className="image" src={image} alt="Failed to load game image" />
    </div>
  );
}
