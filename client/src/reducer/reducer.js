const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  platforms: [],
  details: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };

    case "FILTER_BY_GENRE":
      const allVideogames = state.allVideogames;
      const genresFiltered =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((el) => el.genres.includes(action.payload));
      return {
        ...state,
        videogames: genresFiltered,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "GET_PLATFORMS":
      return {
        ...state,
        platforms: action.payload,
      };

    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "Created"
          ? state.allVideogames.filter((e) => e.createdInDb)
          : state.allVideogames.filter((el) => !el.createdInDb);
      return {
        ...state,
        videogames:
          action.payload === "All" ? state.allVideogames : createdFilter,
      };

    case "ORDER_NAME":
      let arrOrder =
        action.payload === "AZ"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: arrOrder,
      };

    case "GET_NAME_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };

    case "FILTER_RATING":
      const filterRating =
        action.payload === "menosp"
          ? state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: filterRating,
      };

   /*  case "POST_VIDEOGAME":
      return {
        ...state,
      }; */

    case "GET_DETAILS_VIDEOGAME":
      return {
        ...state,
        details: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
