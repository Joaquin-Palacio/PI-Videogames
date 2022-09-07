import React from "react";
import "./styles/Card.css";

export default function Cards({ name, image, genres, platforms, id, rating }) {
  return (
    <div className="card">
      <h1 className="NameTitle">
        {name.replace(name[0], name[0].toUpperCase())}
      </h1>
      <img src={image} alt="imagen del juego" className="imgCard" />
      <span></span>
      <div className="divInfo">
        <h3 className="ContentTitle">Genres</h3>
        {genres?.map((e) => {
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
        <div className="otherCaracters">
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
        </div>
      </div>
    </div>
  );
}
