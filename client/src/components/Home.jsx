import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllVideogames,
  filterVideogameByGenre,
  getGenres,
  getPlatforms,
  filterByCreated,
  filterByAlpha,
  filterByRating,
  filterVideogameByPlatform,
} from "../actions/index";
import Paginado from "./Paginado.jsx";
import Card from "./Card";
import SearchBar from "./SearchBar.jsx";
import "./styles/Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allVideogamesLoad = useSelector((state) => state.allVideogames);
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamePerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  function handleClick() {
    dispatch(getAllVideogames());
  }

  function handleFilterGenre(e) {
    e.preventDefault();
    dispatch(filterVideogameByGenre(e.target.value));
  }

  function handleFilterPlatform(e) {
    e.preventDefault();
    dispatch(filterVideogameByPlatform(e.target.value));
  }

  function handleFilterByCreated(e) {
    e.preventDefault();
    dispatch(filterByCreated(e.target.value));
  }

  function handleFilterByAlpha(e) {
    e.preventDefault();
    dispatch(filterByAlpha(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleFilterByRating(e) {
    e.preventDefault();
    dispatch(filterByRating(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div className="container-home">
      {!allVideogamesLoad.length ? (
        <div className="home-loading">
          <img
            src="https://tenor.com/view/colores-movimiento-luces-formas-gif-19676825"
            alt="LOADING.."
          />
        </div>
      ) : (
        <div>
          <div className="probando">
            <div className="home-filters">
              <select
                className="home-select"
                onChange={(e) => {
                  handleFilterByAlpha(e);
                }}
              >
                <option disabled={order}>Order</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A </option>
              </select>

              <select
                className="home-select"
                id="ratingSelect"
                onChange={(e) => {
                  handleFilterByRating(e);
                }}
              >
                <option disabled={order}>Select Rating</option>
                <option value="asc">Least Popular</option>
                <option value="des">Most Popular</option>
              </select>

              <select
                class="home-select"
                name="genres"
                onChange={(e) => handleFilterGenre(e)}
              >
                <option value={"all"}>All Genres</option>

                {genres?.map((x) => {
                  return <option value={x.name}>{x.name}</option>;
                })}
              </select>

              <select
                class="home-select"
                name="platforms"
                onChange={(e) => handleFilterPlatform(e)}
              >
                <option value={"all"}>All Platforms</option>

                {platforms?.map((p) => {
                  return <option value={p.name}>{p.name}</option>;
                })}
              </select>

              <select
                class="home-select"
                id="originSelect"
                onChange={(e) => handleFilterByCreated(e)}
              >
                <option value="all">All Video Games</option>
                <option value="api">Existing</option>
                <option value="created">Created</option>
              </select>
            </div>
            <div>
              <SearchBar />
            </div>
          </div>
          <div className="home-buttons">
            <Link to="/videogames/create">
              <button className="home-btn-create">Create Video game</button>
            </Link>
            <button
              className="home-btn-reload"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Reload Page
            </button>
          </div>

          <div>
            <Paginado
              videogamesPerPage={videogamesPerPage}
              allVideogames={allVideogames.length}
              paginado={paginado}
            />
            {currentVideogames.length ? (
              currentVideogames?.map((e) => {
                return (
                  <Link to={"/home/" + e.id}>
                    <Card name={e.name} image={e.image} genres={e.genres} />
                  </Link>
                );
              })
            ) : (
              <div className="home-error">
                <h1>Sorry, Your Search Had No Results 👎</h1>
                <img
                  src="https://media.giphy.com/media/dUqu8On8QYJoFTj5FR/giphy.gif"
                  alt="gift"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
