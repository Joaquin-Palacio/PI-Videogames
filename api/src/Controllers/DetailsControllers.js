require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Videogame, Genre, Platform } = require("../db.js");

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (id.length > 8) {
      const videogame = await Videogame.findByPk(id, {
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
          {
            model: Platform,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.send(videogame);
    } else {
      const gameDetail = await axios(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      let e = gameDetail.data;
      const detailsObj = {
        id: e.id,
        name: e.name,
        released: e.released,
        image: e.background_image,
        rating: e.rating,
        description: e.description,
        genres: e.genres,
        platforms: e.platforms.map((e) => e.platform.name),
      };
      return res.send(detailsObj);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name, description, released, image, rating, platforms, genre } =
    req.body;
  try {
    const newGame = await Videogame.create({
      name,
      description,
      released,
      rating,
      image,
    });

    let genreDb = await Genre.findAll({
      where: {
        name: genre,
      },
    });

    let platformDb = await Platform.findAll({
      where: {
        name: platforms,
      },
    });
    newGame.addGenre(genreDb);
    newGame.addPlatforms(platformDb);

    res.send("Videojuego creado con exito");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
