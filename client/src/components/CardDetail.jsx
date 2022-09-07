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
    <div className="detail_component">
      <div className="allCard">
        {videogame.name ? (
          <div className="cardDetail">
            <div className="containterLeft">
              <h1>{videogame.name}</h1>
              <img
                src={videogame.image}
                className="imgDetailCard"
                alt="Imagen del jueego"
              />
              <br></br>
              <h3>Description</h3>
              <p>{videogame.description}</p>
              <h3>Genres:</h3>
              {videogame.genres?.map((e) => {
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
              <h3>Platforms:</h3>
              {videogame.platforms?.map((e) => {
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
            <div className="containterRight_detail">
              <Link to="/home">
                <button className="ButtonBack">Back to home!</button>
              </Link>
              <div className="info">
                <label>Released</label>
                <h6>{videogame.released}</h6>
                <label>Rating</label>
                <h3>{videogame.rating}</h3>
              </div>
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
    </div>
  );
}
