import React from "react";
import "./styles/Card.css";

export default function Card({ name, image, genres }) {
  return (
    <div className="container_card">
        <h1 className="card_name">
          {name.replace(name[0], name[0].toUpperCase())}
        </h1>
        <img src={image} alt="image" className="card_image" />
        <h3 className="card_genres_title">Genres</h3>
        {genres?.map((e) => {
          if (typeof e === "string") {
            return (
              <span className="card_genre_type" key={e}>
                {e.replace(e[0], e[0].toUpperCase())} 
              </span>
            );
          } else {
            return <span className="card_genre_type" key={e.name}>{e.name} </span>;
          }
        })}
    </div>
  );
}

{
  /*  <div className="otherCaracters">
          <h4 className="ContentTitle">Rating</h4>
          <span className="RatingNumber">{rating}</span>
          <h4 className="ContentTitle">Platforms</h4>
          {platforms?.map((e) => {
            if (typeof e === "string") {
              return (
                <span className="type" key={e}>
                  {e.replace(e[0], e[0].toUpperCase())} |
                </span>
              );
            } else {
              return <span key={e.name}>{e.name} |</span>;
            }
          })}
        </div> */
}
