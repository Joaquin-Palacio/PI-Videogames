import axios from "axios";

export function getAllVideogames() {
  return async function (dispatch) {
    var games = await axios.get("/videogames");
    return dispatch({
      type: "GET_ALL_VIDEOGAMES",
      payload: games.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    var allGenres = await axios.get("/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: allGenres.data,
    });
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    var allPlatforms = await axios.get("/platforms");
    return dispatch({
      type: "GET_PLATFORMS",
      payload: allPlatforms.data,
    });
  };
}

//? ------------------- FILTROS -------------------------- //

export function filterByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function filterByPlatform(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function filterByCreated(payload) {
  return {
    type: "FILTER_BY_CREATED",
    payload,
  };
}

export function filterByAzZa(payload) {
  return {
    type: "FILTER_AZ_ZA",
    payload,
  };
}

export function filterByRating(payload) {
  return {
    type: "FILTER_BY_RATING",
    payload,
  };
}

//? ------------ Busca por nombre y solo trae 15 resultados ----------- //
export function getVideogameByName(name) {
  return async function (dispatch) {
    try {
      var videogameName = await axios.get(`/videogames?name=${name}`);
      return dispatch({
        type: "GET_VIDEOGAME_BY_NAME",
        payload: videogameName.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getVideogameDetail(id) {
  return async function (dispatch) {
    try {
      var videogameDetail = await axios.get(`/videogame/${id}`);
      return dispatch({
        type: "GET_VIDEOGAME_DETAIL",
        payload: videogameDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//! mmmm..
export function postNewVideogame(payload) {
  return async function (dispatch) {
    try {
       const videogameCreated = await axios.post("/videogame", payload);
       return videogameCreated;
    } catch (error) {
      console.log(error);
    }
  }
}
