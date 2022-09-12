import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getGenres,
  getPlatforms,
  postVideogameCreated,
} from "../actions/index";
import "./styles/VideogameCreate.css";

const expresionDate = {
  date: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
};

function validate(videogame) {
  let errors = {};
  if (!videogame.name) {
    errors.name = "The name of the video game is required";
  } else if (!videogame.description) {
    errors.description = "Add a description of your video game";
  } else if (
    parseFloat(videogame.rating) < 1 ||
    parseFloat(videogame.rating) > 5
  ) {
    errors.rating = "The rating must be a number from 1 to 5";
  } else if (!expresionDate.date.test(videogame.released)) {
    errors.released = ' You must enter date with "dd-mm-yyyy" format ';
  }
  return errors;
}

export default function AddVideogame() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const [videogame, setVideogame] = useState({
    name: "",
    description: "",
    image: "",
    rating: 0,
    released: "",
    genre: [],
    platforms: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  function handleChange(e) {
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
  }

  function handleSelectGenre(e) {
    setVideogame({
      ...videogame,
      genre: [...videogame.genre, e.target.value],
    });
  }
  function handleSelectPlatforms(e) {
    setVideogame({
      ...videogame,
      platforms: [...videogame.platforms, e.target.value],
    });
  }

  function handleDeleteGenres(el) {
    setVideogame({
      ...videogame,
      genre: videogame.genre.filter((e) => e !== el),
    });
  }
  function handleDeletePlatforms(el) {
    setVideogame({
      ...videogame,
      platforms: videogame.platforms.filter((e) => e !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!errors.name && !errors.description && !errors.rating) {
      if (!videogame.name) {
        alert("You must add a name");
      } else if (!videogame.description) {
        alert("You must add a description");
      } else if (videogame.genre.length < 1) {
        alert("You must add at least one genre");
      } else if (videogame.platforms.length < 1) {
        alert("You must add at least one platform");
      } else {
        dispatch(postVideogameCreated(videogame));
        alert("Videogame Created!");

        setVideogame({
          name: "",
          description: "",
          image: "",
          rating: 0,
          released: "",
          genre: [],
          platforms: [],
        });
        navigate("/home");
      }
    } else {
      alert("Faltan datos necesarios para crear el videojuego");
    }
  }

  return (
    <div className="container-form-page">
      <div className="form-btn-back">
        <Link to="/home">
          <button>
            <h3>Back to Home</h3>
          </button>
        </Link>
      </div>

      <div className="container-form">
        <h1>¡Add a new videogame!</h1>
        <form onSubmit={(e) => handleSubmit(e)}>

          <div className="nameForm">
            <label>Name:</label>
            <br />
            <input
              type="text"
              name="name"
              placeholder="Name..."
              value={videogame.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="nameForm">
            <label>Description:</label>
            <br />
            <input
              type="text"
              name="description"
              placeholder="Description..."
              value={videogame.description}
              onChange={(e) => handleChange(e)}
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>

          <div className="nameForm">
            <label>Image URL:</label>
            <br />
            <input
              name="image"
              type="text"
              placeholder="URL image"
              value={videogame.image}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="nameForm">
            <label>Rating:</label>
            <br />
            <input
              name="rating"
              type="number"
              value={videogame.rating}
              onChange={(e) => handleChange(e)}
            />
            {errors.rating && <p className="error">{errors.rating}</p>}
          </div>

          <div className="nameForm">
            <label>Released:</label>
            <br />
            <input
              name="released"
              type="text"
              placeholder="DD-MM-YYYY"
              value={videogame.released}
              onChange={(e) => handleChange(e)}
            />
            {errors.released && <p className="error">{errors.released}</p>}
          </div>

          <div className="genres">
            <div>              
              <label>Genres: </label>
              <br />
            </div>
            <div>
              <select
                className="selectBox"
                onChange={(e) => handleSelectGenre(e)}
              >
                <option disabled={genres.length}>Select Genre</option>
                {genres?.map((e) => (
                  <option value={e.name}>{e.name}</option>
                ))}
              </select>
            </div>
            <div>          

              <div cassName="cajita">
                <br />
                {videogame.genre?.map((el) => (
                  <div className="cajitaElemento">
                    <span>{el}</span>
                    <button
                      className="ButtonX"
                      type="reset"
                      onClick={() => handleDeleteGenres(el)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div cassName="cajita">
              <label>Platforms:</label>
              <br />
            </div>
            <div>
              <select
                className="selectBox"
                onChange={(e) => handleSelectPlatforms(e)}
              >
                <option disabled={genres.length}>Select Platform</option>
                {platforms?.map((e) => (
                  <option value={e.name}>{e.name}</option>
                ))}
                {errors.genre && <p className="error">{errors.genre}</p>}
              </select>
            </div>

            <div>
              <br />
              {videogame.platforms?.map((el) => (
                <div className="cajitaElemento">
                  <span>{el}</span>
                  <button
                    className="ButtonX"
                    type="reset"
                    onClick={() => handleDeletePlatforms(el)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-btn-create">
            <button type="submit">PLAY 🕹️</button>
          </div>

          <br />
        </form>
      </div>
    </div>
  );
}
