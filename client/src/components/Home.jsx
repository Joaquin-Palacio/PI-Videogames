import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './styles/home.css';
import {
  getVideogames,
  filterVideogamesByGenre,
  getGenres,
  filterCreated,
  orderName,
  filterRating,
  getPlatforms,
  filterVideogamesByPlatform,
} from "../actions/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado.jsx";
import SearchBar from "./SearchBar.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const [order, setOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);                        // siempre arranco de la primer pagina
  const [videogamesPerPage, setVideogamePerPage] = useState(15);            //videogames por pagina
  const indexOfLastVideogame = currentPage * videogamesPerPage;             // 15
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;   // 0  
  const currentVideogames = allVideogames.slice( indexOfFirstVideogame, indexOfLastVideogame );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);


  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
  }

  const handleFilterGenre = (e) => {
    e.preventDefault();
    dispatch(filterVideogamesByGenre(e.target.value));
  }

  const handleFilterPlatform = (e) => {
    e.preventDefault();
    dispatch(filterVideogamesByPlatform(e.target.value));
  }


  const handleFilterRating = (e) => {
    e.preventDefault()
    dispatch(filterRating(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
    }

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value))
  }

  const handleOrderName = (e) => {
    e.preventDefault();
    dispatch(orderName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  return (
    <div className="home">
      <h1 className="Homeh1">LOLIXGAMES</h1>
    
        <Link to="/videogame" className="link">Create Your Videogame</Link>
        <button onClick={ (e) => {handleClick(e)} } className="botonCargarJuegos">
          Reload Videogames
        </button>
      
      <SearchBar />
 
      <div>
        <select onChange={(e) => handleOrderName(e)} className='botonOrdenar'>
          <option disabled={order}>Order Alphabetically</option>
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
        </select>

        <select onChange={(e) => handleFilterRating(e)} className='botonOrdenarRating'>
          <option disabled={order}>Order by Rating</option>
          <option value="masp">Most Populars</option>
          <option value="menosp">Least Populars</option>
        </select>
        

        <select onChange={(e) => handleFilterGenre(e)} className='botonFiltrarGeneros'>
          <option value={"All"}>Filter by Genres</option>
          {genres?.map((x) => {
            return <option value={x.name}>{x.name}</option>;
          })}
        </select>

        <select onChange={(e) => handleFilterPlatform(e)} className='botonFiltrarPlataformas'>
          <option value={"All"}>Filter by Platforms</option>
          {platforms?.map((z) => {
            return <option value={z.name}>{z.name}</option>;
          })}
        </select>


        <select onChange={(e) => handleFilterCreated(e)} className='botonFiltrarApiCreados'>
          <option value="All">All Videogames</option>
          <option value="Api">Videogames API</option>
          <option value="Created">Videogames Created</option>
        </select>

        <Paginado 
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />

        {currentVideogames?.map((e) => {
          return (
            <fragment>
              <Link to={"/home/" + e.id}>
                <Card
                  name={e.name}
                  image={e.image}
                  genres={e.genres} 
                  key={e.id}
                />
              </Link>
            </fragment>
          );
        })}
      </div>
    </div>
  );
}
