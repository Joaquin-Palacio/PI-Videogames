const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  platforms: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
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

    case "FILTER_BY_GENRE":
      const allVideogames = state.allVideogames;
      if (action.payload === "all") {
        return {
          ...state,
          videogames: allVideogames,
        };
      } else {
        let filterByGenre = allVideogames.filter((el) => {
          for (let i = 0; i < el.genres.length; i++) {
            if (el.genres[i].name === action.payload) {
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
      const allVideogamesforplatforms = state.allVideogames;
      if (action.payload === "all") {
        return {
          ...state,
          videogames: allVideogamesforplatforms,
        };
      } else {
        let filterByPlatform = allVideogamesforplatforms.filter((el) => {
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

    case "FILTER_BY_CREATED":
      const filterCreated =
        action.payload === "created"
          ? state.allVideogames.filter((e) => e.createdInDb)
          : state.allVideogames.filter((e) => !e.createdInDb);
      return {
        ...state,
        videogames:
          action.payload === "all" ? state.allVideogames : filterCreated,
      };
      
    case "FILTER_BY_ALPHA":
      const filterAlpha =
        action.payload === "asc"
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
        videogames: filterAlpha,
      };

    case "FILTER_BY_RATING":
      const filterRating =
        action.payload === "asc"
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

    case "GET_VIDEOGAME_BY_NAME":
      return {
        ...state,
        videogames: action.payload,
      };

    case "POST_VIDEOGAME":
      return {
        ...state,
      };

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
