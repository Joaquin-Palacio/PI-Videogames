import React from "react";
import "./styles/Card.css";

export default function Card({ name, image, genres  }) {
  return (
    <div className="card">
      <h2 className="name">{name}</h2>
      <h4 className="h4Card">Genres: </h4>
      {genres?.map(e => {
        if(typeof(e) === 'string'){
          return (  
              <span className="spansCard" key={e.name}>{e}</span>
          )
        } else {
          return (  
              <span className="spansCard" key={e.name}>{e.name}</span>                   
          )
        }
      })}
      <img className="image" src={image} alt="Failed to load game image" />
    </div>
  );
}
