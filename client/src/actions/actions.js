import axios from "axios";

// conectamos la ruta que hicimos en el back al front.
export function getVideogames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/platforms");
    return dispatch({
      type: "GET_PLATFORMS",
      payload: json.data,
    });
  };
}

export function postVideogame(payload) {
  return async function () {
    var json = await axios.post("http://localhost:3001/videogame", payload);
    return json;
  };
}

export function getDetailsVideogame(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/videogame/" + id);
      return dispatch({
        type: "GET_DETAILS_VIDEOGAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterVideogamesByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function filterVideogamesByPlatform(payload) {
  return {
    type: "FILTER_BY_PLATFORM",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function filterRating(payload) {
  return {
    type: "FILTER_RATING",
    payload,
  };
}

export function orderName(payload) {
  return {
    type: "ORDER_NAME",
    payload,
  };
}

export function getNameVideogames(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: "GET_NAME_VIDEOGAMES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
