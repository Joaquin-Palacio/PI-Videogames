import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getGenres, postVideogame, getPlatforms } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import "./styles/createGame.css";

const expresionDate = {
  date: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
};

function validate(videogame) {
  let errors = {};
  if (!videogame.name) {
    errors.name = "Please put a name for continue";
  } else if (!videogame.description) {
    errors.description = "Please put a description for continue";
  } else if (!expresionDate.date.test(videogame.released)) {
    errors.released = "Please put a released date for continue";
  } else if (
    parseFloat(videogame.rating) < 1 || parseFloat(videogame.rating) > 5
  ) {
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

  const [videogame, setVideogame] = useState({
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
    setVideogame({
      ...videogame,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...videogame,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleGenre = (e) => {
    setVideogame({
      ...videogame,
      genre: [...videogame.genre, e.target.value],
    });
  };

  const handlePlatform = (e) => {
    setVideogame({
      ...videogame,
      platforms: [...videogame.platforms, e.target.value],
    });
  };

  const handleDeleteGenre = (e) => {
    setVideogame({
      ...videogame,
      genre: videogame.genre.filter((ge) => ge !== e),
    });
  };

  const handleDeletePlatforms = (e) => {
    setVideogame({
      ...videogame,
      platforms: videogame.platforms.filter((pla) => pla !== e),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.description &&
      !errors.released &&
      !errors.rating &&
      videogame.genre.length < 1 &&
      videogame.platforms.length < 1
    ) {
      dispatch(postVideogame(videogame));
      alert("Videogame created successfully");

      setVideogame({
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
            name="name"
            placeholder="Name.."
            value={videogame.name}
            onChange={(e) => handleChange(e)}
          />

          <input
            className="inputDescription"
            type="text"
            placeholder="Description.."
            value={videogame.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />

          <input
            className="inputReleased"
            type="text"
            placeholder="dd-mm-yyyy.."
            value={videogame.released}
            name="released"
            onChange={(e) => handleChange(e)}
          />

          <input
            className="inputImage"
            type="text"
            placeholder="Image.."
            value={videogame.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />

          <label className="labelRating">Rating: </label>
          <input
            className="inputRating"
            placeholder="Rating.."
            type="number"
            value={videogame.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
          />
        </div>

          <div>
            <label className="labelGenres">Genres: </label>
            <br />
          </div>

          <select className="selectBox" onChange={(e) => handleGenre(e)}>
            <option disabled={videogame.genre.length}>Select Genre</option>
            {genres.map((g) => (
              <option value={g.name}>{g.name}</option>
            ))}
          </select>

          <div className="cajita">
            <label>Genres Selected: </label>
            <br />
            {videogame.genre?.map((e) => (
              <div className="cajitaElemento">
                <span>{e}</span>
                <button
                  className="botonX"
                  onClick={() => handleDeleteGenre(e)}
                  type="reset"
                > X </button>
              </div>
            ))}
          </div>

          <br />
          <div className="cajita">
            <label>Platforms: </label>
            <br />
            <select className="selectBox" onChange={(e) => handlePlatform(e)}>
              <option disabled={videogame.platforms.length}>
                Select Platform
              </option>
              {platforms.map((p) => (
                <option className="optionPlataformas" value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>

            <div>
              <label>Platforms Selected:</label>
              <br />
              {videogame.platforms?.map((e) => (
                <div className="cajitaElemento">
                  <span>{e}</span>
                  <button
                    className="botonX"
                    onClick={() => handleDeletePlatforms(e)}
                    type="reset"
                  > X </button>
                </div>
              ))}
            </div>
          </div>
        
        <br />
        <div className="errores">
          {errors.name && <span className="error">{errors.name}</span>}
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
          {errors.released && <span className="error">{errors.released}</span>}
          {errors.rating && <span className="error">{errors.rating}</span>}
          {errors.genre && <span className="error">{errors.genre}</span>}
          {errors.platforms && (
            <span className="error">{errors.platforms}</span>
          )}
        </div>
        <br />
        <button className="botonCrear" type="submit">
          Create Videogame
        </button>
      </form>
    </div>
  );
}
