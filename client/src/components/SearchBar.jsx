import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVidogamesByName } from "../actions";
import "./styles/SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getVidogamesByName(name));
    setName("");
  }

  return (
    <div className="container-searchBar">
      <input
        type="text"
        className="searchBar-input"
        name="name"
        placeholder="Search Videogames..."
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className="searchBar-btn"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search 
      </button>
    </div>
  );
}
