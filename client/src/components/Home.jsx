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
    <div className="allHome">
      {!allVideogamesLoad.length ? (
        <div className="loading">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif"
            alt=""
          />
        </div>
      ) : (
        <div>
          <div>
            <div className="Filters_Container">
              <select
                class="custom-select"
                onChange={(e) => {
                  handleFilterByAlpha(e);
                }}
              >
                <option disabled={order}>Alpha order</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A </option>
              </select>

              <select
                class="custom-select"
                id="ratingSelect"
                onChange={(e) => {
                  handleFilterByRating(e);
                }}
              >
                <option disabled={order}>Select Rating</option>
                <option value="asc">to the least popular</option>
                <option value="des">to the most popular</option>
              </select>

              <select
                class="custom-select"
                name="genres"
                onChange={(e) => handleFilterGenre(e)}
              >
                <option value={"all"}>All Genres</option>

                {genres?.map((x) => {
                  return <option value={x.name}>{x.name}</option>;
                })}
              </select>

              <select
                class="custom-select"
                name="platforms"
                onChange={(e) => handleFilterPlatform(e)}
              >
                <option value={"all"}>All Platforms</option>

                {platforms?.map((p) => {
                  return <option value={p.name}>{p.name}</option>;
                })}
              </select>

              <select
                class="custom-select"
                id="originSelect"
                onChange={(e) => handleFilterByCreated(e)}
              >
                <option value="all">All Video Games</option>
                <option value="api">Existing</option>
                <option value="created">Created</option>
              </select>

              <div className="SearchBar">
                <SearchBar />
              </div>
            </div>

            <div>
              <Link to="/videogames/create">
                <button className="buttonHome">CREATE</button>
              </Link>
              <button
                className="buttonHome"
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Reload Video Games
              </button>
              <Link to="/">
                <button className="buttonHome">EXIT</button>
              </Link>
            </div>
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
                    <Card
                      name={e.name}
                      image={e.image}
                      genres={e.genres}
                    />
                  </Link>
                );
              })
            ) : (
              <div className="errorFound">
                <h1>Sorry!, the searched video game is not found</h1>
                <h2>Error 404</h2>
                <img
                  src="https://www.pngplay.com/wp-content/uploads/6/Game-Over-Yellow-Transparent-PNG.png"
                  alt="img"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
