import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getGenres, postVideogame, getPlatforms } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import "./styles/createGame.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Por favor coloque un nombre para continuar";
  } else if (!input.description) {
    errors.description = "Por favor coloque una descripción para continuar";
  } else if (!input.released) {
    errors.released =
      "Por favor coloque una fecha de lanzamiento para continuar";
  } else if (!input.rating) {
    errors.rating = "Por favor coloque una puntuación para continuar";
  }
  return errors;
}

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    released: "",
    image: "",
    rating: 0,
    description: "",
    genre: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, []);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleGenre = (e) => {
    setInput({
      ...input,
      genre: [...input.genre, e.target.value],
    });
  };

  const handlePlatform = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  };

  const handleDeleteGenre = (e) => {
    setInput({
      ...input,
      genre: input.genre.filter((ge) => ge !== e),
    });
  };

  const handleDeletePlatforms = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((pla) => pla !== e),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     if(!errors.name && !errors.description){
        dispatch(postVideogame(input));
        alert("Videojuego creado con éxito");
        console.log(input);
        setInput({
          name: "",
          released: "",
          image: "",
          rating: 0,
          description: "",
          genre: [],
          platforms: [],
        });
        history.push("/home");
      } else {
        alert('Faltan campos por completar');
      }
  };

  return (
    <div className="create">
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crear Videojuego</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="text"
            placeholder="Name.."
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Description.."
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Released.."
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          />
          {errors.released && <p className="error">{errors.released}</p>}
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            min={1}
            max={5}
            value={input.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div>
          <label></label>
          <input
            type="text"
            placeholder="Image.."
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <label>Genres:</label>
        <select onChange={(e) => handleGenre(e)}>
          {genres.map((g) => (
            <option value={g.name}>{g.name}</option>
          ))}
        </select>
        {input.genre.map((e) => (
          <div>
            <p>{e}</p>
            <button
              className="botonX"
              onClick={() => handleDeleteGenre(e)}
              type="reset"
            >x</button>
          </div>
        ))}
        <br />

        <label>Plataforms:</label>
        <select onChange={(e) => handlePlatform(e)}>
          {platforms.map((p) => (
            <option value={p.name}>{p.name}</option>
          ))}
        </select>
        {input.platforms.map((e) => (
          <div>
            <p>{e}</p>
            <button
              className="botonXplatforms"
              onClick={() => handleDeletePlatforms(e)}
              type="reset"
            >x</button>
          </div>
        ))}
        <br />

        <button type="submit">Crear nuevo videojuego</button>
      </form>
    </div>
  );
}
