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
      if (action.payload === "All") {
        return {
          ...state,
          videogames: allVideogames,
        };
      } else {
        let filterByGenre = allVideogames.filter((el) => {
          for (let i = 0; i < el.genres.length; i++) {
            if (el.genres[i].name === action.payload) {
              return true;
            } else if (el.genres[i] === action.payload) {
              return true;
            }
          }
          return false;
        });
        return {
          ...state,
          videogames: [...filterByGenre],
        };
      }

    case "FILTER_BY_PLATFORM":
      const allGames = state.allVideogames;
      if (action.payload === "All") {
        return {
          ...state,
          videogames: allGames,
        };
      } else {
        let filterByPlatform = allGames.filter((el) => {
          for (let i = 0; i < el.platforms.length; i++) {
            if (el.platforms[i].name === action.payload) {
              return true;
            } else if (el.platforms[i] === action.payload) {
              return true;
            }
          }
          return false;
        });
        return {
          ...state,
          videogames: [...filterByPlatform],
        };
      }

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

    case "GET_DETAILS_VIDEOGAME":
      return {
        ...state,
        details: action.payload,
      };
    /*  case "POST_VIDEOGAME":
          return {
            ...state,
          }; */

    default:
      return state;
  }
}

export default rootReducer;
