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
    <div className="containerSearch">
      <input
        type="text"
        className="inputSearch"
        name="name"
        placeholder="search game..."
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className="buttonSearch"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
