import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getGenres, postVideogame, getPlatforms } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import "./styles/createGame.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Please put a name for continue";
  } else if (!input.description) {
    errors.description = "Please put a description for continue";
  } else if (!input.released) {
    errors.released = "Please put a released date for continue";
  } else if (parseFloat(input.rating) < 1 || parseFloat(input.rating) > 5) {
    errors.rating = "The rating must be a number from 1 to 5";
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
    if (
      !errors.name &&
      !errors.description &&
      !errors.released &&
      !errors.rating
    ) {
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
      alert("Missing data required");
    }
  };

  return (
    <div className="create">
      <Link to="/home">
        <button className="botonVolver">Return to Main Page</button>
      </Link>

      <h1>Create Your New Videogame</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        
        <div className="inputs">
        <input
          className="inputName"
          type="text"
          placeholder="Name.."
          value={input.name}
          name="name"
          onChange={(e) => handleChange(e)}
        />
        <input
          className="inputDescription"
          type="text"
          placeholder="Description.."
          value={input.description}
          name="description"
          onChange={(e) => handleChange(e)}
        />

        <input
          className="inputReleased"
          type="text"
          placeholder="Released Date.."
          value={input.released}
          name="released"
          onChange={(e) => handleChange(e)}
        />

        <input
          className="inputImage"
          type="text"
          placeholder="Image.."
          value={input.image}
          name="image"
          onChange={(e) => handleChange(e)}
        />

        <label className="labelRating">Rating: </label>
        <input
          className="inputRating"
          placeholder="Rating.."
          type="number"
          value={input.rating}
          name="rating"
          onChange={(e) => handleChange(e)}
        />
      </div>


        <div className="GenYPlat">
          <label className="labelGenres">Genres: </label>
          <select onChange={(e) => handleGenre(e)}>
            {genres.map((g) => (
              <option className="optionGeneros" value={g.name}>
                {g.name}
              </option>
            ))}
          </select>

          {input.genre.map((e) => (
            <div>
              <p> {e} | </p>
              <button
                className="botonX"
                onClick={() => handleDeleteGenre(e)}
                type="reset"
              >X</button>
            </div>
          ))}

          <br />

          <label className="labelPlatforms">Plataforms: </label>
          <select onChange={(e) => handlePlatform(e)}>
            {platforms.map((p) => (
              <option className="optionPlataformas" value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          {input.platforms.map((e) => (
            <div>
              <p>| {e} |</p>
              <button
                className="botonXplatforms"
                onClick={() => handleDeletePlatforms(e)}
                type="reset"
              >X</button>
            </div>
          ))}
        </div>

        <br />

        <div className="errores">
          {errors.name && <span className="error">{errors.name}</span>}
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
          {errors.released && <span className="error">{errors.released}</span>}
          {errors.rating && <span className="error">{errors.rating}</span>}
        </div>
        <br />

        <button className="botonCrear" type="submit">
          Create Videogame
        </button>
      </form>
    </div>
  );
}
