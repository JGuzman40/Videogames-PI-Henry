const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getVideogames = require('../controllers/getVideogames');
const getVideogamesById = require('../controllers/getVideogameById');
const getVideogamesByName = require('../controllers/getVideogameByName');
const createVideogame = require('../controllers/postVideogames');
const getVideogamesGenre = require('../controllers/getVideogameGenres');


const router = Router();

router.get("/videogames", getVideogames);
router.get("/videogames/:idVideogame", getVideogamesById);
router.get("/videogames/name", getVideogamesByName);
router.post("/videogames", createVideogame);
router.get("/genres", getVideogamesGenre);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
