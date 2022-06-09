require("dotenv").config();
const { Router } = require("express");
const router = Router();
const getApiGames = require("../FunctionsApi&Db/GetApiGames");
const getVideoGamesCreated = require("../FunctionsApi&Db/GetGamesCreated");

router.get("/", async (req, res, next) => {
  let videogamesInApi;
  let videogamesInDb;
  const { name } = req.query;

  try {
    videogamesInApi = await getApiGames();
    videogamesInDb = await getVideoGamesCreated();

    Promise.all([videogamesInApi, videogamesInDb]).then((response) => {
      const [videogamesInApi, videogamesInDb] = response;

      let VideogamesfromApi = videogamesInApi.map((e) => {
        return {
          id: e.id,
          name: e.name.toUpperCase(),
          released: e.released,
          image: e.background_image,
          rating: e.rating,
          decription: e.slug,
          genres: e.genres.map((g) => g.name),
          platforms: e.platforms.map((p) => p.platform.name),
        };
      });

      let allVideogames = [...videogamesInDb, ...VideogamesfromApi];

      if (name) {
        let onlyfifteen = allVideogames
          .filter((e) => e.name.includes(name.toUpperCase()))
          .slice(0, 16);
        res.send(onlyfifteen);
      } else if (!allVideogames.length) {
        return res.send("No response").status(404);
      } else res.send(allVideogames);
    });
  } catch (error) {
    next(error);
  }
});


// en caso de querer buscar por name a traves de la api. Fuera de los 100 que traemos.

/* try {
    if (name) {
      videogamesInApi = await getApiGames(name);
      videogamesInDb = await getVideoGamesCreated(name);
    } else {
      videogamesInApi = await getApiGames();
      videogamesInDb = await getVideoGamesCreated();
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
      if (!allVideogames.length) {
        return res.send("No Response").status(404);
      }
      res.send(allVideogames);
    });
  } catch (error) {
    next(error);
  }
}); */

module.exports = router;
