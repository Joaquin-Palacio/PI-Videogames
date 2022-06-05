const { Router } = require('express');
const  videogameControllers = require('../controllers/videogameControllers');
const DetailsControllers = require('../controllers/DetailsControllers');
const GenreControllers = require('../Controllers/GenreControllers');
const Platforms = require('../Controllers/PlatformsController');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers

router.use('/videogame', DetailsControllers);
router.use('/videogames', videogameControllers);
router.use('/genres', GenreControllers)
router.use('/platforms', Platforms)

module.exports = router;