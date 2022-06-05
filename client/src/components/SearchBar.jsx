import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");


  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNameVideogames(name));
  };

  return (
    <div>
      <input value={name}
        type="text"
        placeholder="Search videogames.."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
