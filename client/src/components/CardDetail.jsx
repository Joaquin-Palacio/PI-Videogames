import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../actions";
import "./styles/CardDetail.css";

export default function CardDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const videogame = useSelector((state) => state.detail);

  return (
    <div className="container-detail">
      {videogame.name ? (
        <div className="detail-card">
          <h1>{videogame.name}</h1>
          <img
            src={videogame.image}
            className="detail-image"
            alt="Video game image"
          />
          <br />
          <div className="detail-description">
            <h3>Description</h3>
            <p>{videogame.description}</p>
          </div>
          <div className="detail-released">
            <h4>Released</h4>
            <p>{videogame.released}</p>
          </div>
          <div className="detail-rating">
            <h4>Rating</h4>
            <p>{videogame.rating}</p>
          </div>
          <br />
          <Link to="/home">
            <button className="detail-btn-back">Back Home</button>
          </Link>
          <div className="detail-gen-plat">
            <h3>Genres:</h3>
            {videogame.genres?.map((e) => {
              if (typeof e === "string") {
                return (
                  <span className="detail-span" key={e}>
                    {e.replace(e[0], e[0].toUpperCase())} |
                  </span>
                );
              } else {
                return (
                  <span className="detail-span" key={e.name}>
                    {e.name} |
                  </span>
                );
              }
            })}
            <h3>Platforms:</h3>
            {videogame.platforms?.map((e) => {
              if (typeof e === "string") {
                return (
                  <span className="detail-span" key={e}>
                    {e.replace(e[0], e[0].toUpperCase())} |
                  </span>
                );
              } else {
                return (
                  <span className="detail-span" key={e.name}>
                    {e.name} |
                  </span>
                );
              }
            })}
          </div>
        </div>
      ) : (
        <div className="loading">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif"
            alt=""
          />
        </div>
      )}
    </div>
  );
}
