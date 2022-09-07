import axios from "axios";

export function getAllVideogames() {
  return async function (dispatch) {
    var videogame = await axios("/videogames");
    return dispatch({
      type: "GET_ALL_VIDEOGAMES",
      payload: videogame.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    var allGenres = await axios("/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: allGenres.data,
    });
  };
}
export function getPlatforms() {
  return async function (dispatch) {
    var allPlatforms = await axios("/platforms");
    return dispatch({
      type: "GET_PLATFORMS",
      payload: allPlatforms.data,
    });
  };
}

//-------------------FILTROS---------------------------///
//ORDENAMIENTO POR GENERO

export function filterVideogameByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}
//ORDENAMIENTO POR PLATAFORMA
export function filterVideogameByPlatform(payload) {
  return {
    type: "FILTER_BY_PLATFORM",
    payload,
  };
}

// ORDENAMIENTO POR ORIGEN
export function filterByCreated(payload) {
  return {
    type: "FILTER_BY_CREATED",
    payload,
  };
}

//ORDENAMIENTO ALFABETICO O

export function filterByAlpha(payload) {
  return {
    type: "FILTER_BY_ALPHA",
    payload,
  };
}

//ORDENAMIENTO POR RATING///

export function filterByRating(payload) {
  return {
    type: "FILTER_BY_RATING",
    payload,
  };
}

/// Buscar todos los luegos por nombre con limite 15
export function getVidogamesByName(name) {
  return async function (dispatch) {
    try {
      var videogameWithName = await axios(`/videogames?name=${name}`);
      return dispatch({
        type: "GET_VIDEOGAME_BY_NAME",
        payload: videogameWithName.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

///Crear videojuego

export function postVideogameCreated(payload) {
  return async function (dispatch) {
    try {
      const videogameCreated = axios.post("/videogame", payload);
      return videogameCreated;
    } catch (error) {
      console.log(error);
    }
  };
}

//-----------DETAIL

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let videogameDetail = await axios(`/videogame/${id}`);

      return dispatch({
        type: "GET_DETAIL",
        payload: videogameDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
