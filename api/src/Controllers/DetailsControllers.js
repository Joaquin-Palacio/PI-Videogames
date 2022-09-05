const { Router } = require("express");
const router = Router();
const { Videogame, Genre, Platform } = require("../db.js");

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
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
  } catch (error) {
    next(error);
  }
});
// [ ] POST /videogame:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos

router.post("/", async (req, res, next) => {
  const { name, description, released, image, rating, platforms, genre } =
    req.body;
  try {
    const newGame = await Videogame.create({
      id: Math.floor((Math.random() + 1) * 100),
      name: name.toUpperCase(),
      description,
      released,
      rating,
      image,
      platforms,
      createdInDb: true,
    });

    let genreDb = await Genre.findAll({
      where: {
        name: genre,
      },
    });

    let platformDb = await Platform.findAll({
      where: { name: platforms },
    });
    newGame.addGenre(genreDb);
    newGame.addPlatforms(platformDb);

    res.send(newGame);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
