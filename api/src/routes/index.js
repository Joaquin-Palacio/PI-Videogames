// Importar todos los routers;

const { Router } = require("express");
const router = Router();
const videogamesC = require("../Controllers/videogameControllers");
const detailsC = require("../controllers/DetailsControllers");
const genresC = require("../Controllers/GenreControllers");
const platformsC = require("../Controllers/PlatformsController");

// Configurar los routers

router.use("/videogame", detailsC);
router.use("/videogames", videogamesC);
router.use("/genres", genresC);
router.use("/platforms", platformsC);

module.exports = router;
