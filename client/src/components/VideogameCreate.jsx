import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getGenres, postVideogame, getPlatforms } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import "./styles/createGame.css";

const expresionDate = {
  date: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
};

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Please put a name for continue";
  } else if (!input.description) {
    errors.description = "Please put a description for continue";
  } else if (!expresionDate.date.test(input.released)) {
    errors.released = "Please enter a valid released date to continue";
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
    if (e.target.value !== "Select Genre")
      if (!input.genre.includes(e.target.value)) {
        setInput({
          ...input,
          genre: [...input.genre, e.target.value],
        });
      }
  };

  const handlePlatform = (e) => {
    if (e.target.value !== "Select Platform")
      if (!input.platforms.includes(e.target.value)) {
        setInput({
          ...input,
          platforms: [...input.platforms, e.target.value],
        });
      }
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
    if (!errors.name && !errors.description && !errors.rating && !errors.released) {
      if (!input.name) {
        alert("The videogame must have a name");
      } else if (!input.description) {
        alert("The videogame must have a description");
      } else if(!input.released){
        alert("The released date is invalid");
      } else if (input.genre.length < 1) {
        alert("The video game must have at least one genre");
      } else if (input.platforms.length < 1) {
        alert("The videogame must have at least one platform");
      } else {
        console.log(input);
        dispatch(postVideogame(input));
        alert("Videogame created successfully");
        setInput({
          name: "",
          description: "",
          image: "",
          rating: 0,
          released: "",
          genre: [],
          platforms: [],
        });
        history.push("/home");
      }
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
            value={input.name}
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
            placeholder="dd-mm-yyyy.."
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

        <div>
          <label className="labelGenres">Genres: </label>
          <br />
        </div>

        <select className="selectBox" onChange={(e) => handleGenre(e)}>
          <option disabled={input.genre.length > 0}>Select Genre</option>
          {genres.map((g) => (
            <option value={g.name}>{g.name}</option>
          ))}
        </select>

        <div className="cajita">
          <br />
          {input.genre.map((e) => (
            <div className="cajitaElemento">
              <span>{e}</span>
              <button
                className="botonX"
                onClick={() => handleDeleteGenre(e)}
                type="reset"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <br />
        <div className="cajita">
          <label>Platforms: </label>
          <br />
          <select className="selectBox" onChange={(e) => handlePlatform(e)}>
            <option disabled={input.platforms.length > 0}>
              Select Platform
            </option>
            {platforms.map((p) => (
              <option className="optionPlataformas" value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          <div>
            <br />
            {input.platforms.map((e) => (
              <div className="cajitaElemento">
                <span>{e}</span>
                <button
                  className="botonX"
                  onClick={() => handleDeletePlatforms(e)}
                  type="reset"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {errors.name && <p className="error">{errors.name}</p>}
        {errors.description && <p className="error">{errors.description}</p>}
        {errors.released && <p className="error">{errors.released}</p>}
        {errors.rating && <p className="error">{errors.rating}</p>}

        <button className="botonCrear" type="submit">
          Create Videogame
        </button>
      </form>
    </div>
  );
}
