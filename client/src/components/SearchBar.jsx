import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions/actions";
import "./styles/searchBar.css";


function validate(input){
  let error = '';
  if(input === ''){
    error = 'Please insert a name';
  }
  return error;
}


export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name !== ""){
     await dispatch(getNameVideogames(name));
      setName("")
    }
    setError(validate(name))
  };
  

  return (
    <div className="search">

      <input
      value={name}
      type="text"
      placeholder="Search videogames.."
      onChange={(e) => handleInputChange(e)}
      className="input"
      />

      <button
      className="botonBuscar"
      type="submit"
      onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
      {error && (
        <p className="errorSearch">{error}</p>
      )
      }
    </div>
  );
}
