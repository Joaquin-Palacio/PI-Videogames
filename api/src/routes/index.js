// Importar todos los routers;

const { Router } = require("express");
const router = Router();
const videogameControllers = require("../Controllers/videogameControllers");
const DetailsControllers = require("../controllers/DetailsControllers");
const GenreControllers = require("../Controllers/GenreControllers");
const Platforms = require("../Controllers/PlatformsController");

// Configurar los routers

router.use("/videogame", DetailsControllers);
router.use("/videogames", videogameControllers);
router.use("/genres", GenreControllers);
router.use("/platforms", Platforms);

module.exports = router;
