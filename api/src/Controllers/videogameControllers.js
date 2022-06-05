require("dotenv").config();
const { Router } = require("express");
const router = Router();
const getApiGames = require("../FunctionsApi&Db/GetApiGames");
const getVideoGamesCreated = require("../FunctionsApi&Db/GetGamesCreated");
const { v4: uuidv4 } = require("uuid");

router.get("/", async (req, res, next) => {
  let videogamesInApi;
  let videogamesInDb;
  const { name } = req.query;

  try {
    if (name) {
      videogamesInApi = await getApiGames(name);
      videogamesInDb = await getVideoGamesCreated(name);
      //todo viene en arrays
    } else {
      videogamesInApi = await getApiGames();
      videogamesInDb = await getVideoGamesCreated();
      //todo viene en arrays
    }
    Promise.all([videogamesInApi, videogamesInDb]).then((response) => {
      const [videogamesInApi, videogamesInDb] = response;

      let VideogamesfromApi = videogamesInApi.map((e) => {
        return {
          id: e.id,
          name: e.name,
          released: e.released,
          image: e.background_image,
          rating: e.rating,
          description: e.slug,
          genres: e.genres.map((g) => g.name),
          platforms: e.platforms.map((p) => p.platform.name),
        };
      });

      let allVideogames = [...videogamesInDb, ...VideogamesfromApi];
      if (allVideogames.length === 0) {
        let ObjetoError = {
          id: uuidv4(),
          name: "Not Found",
          released: "00-00-0000",
          image: "https://definicion.de/wp-content/uploads/2009/02/error.png",
          rating: 0,
          description: "This game does not exist",
          genres: [],
          platforms: [],
        };
        return res.send([ObjetoError]).status(404);
      }
      res.send(allVideogames);
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
