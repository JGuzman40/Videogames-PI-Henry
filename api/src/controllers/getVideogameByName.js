require('dotenv').config();
const { Videogame, Genre, Game_Genre } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');

const URL = `https://api.rawg.io/api/games?search={gameName}` 
const API_KEY = process.env.API_KEY;

const getVideogamesByName = async (req, res) => {
    const { gameName } = req.query;

    try {
        const videogameFromDB = await Videogame.findAll({   // consulta a la base de datos
            where: {
                name: {
                    [Op.iLike]: `%${gameName}%`, // esta configuración busca de manera case-insensitive(investigar)
                },
            },
            include: [{ model: Genre, through: Game_Genre }],
            limit: 15, // para que solo muestre los primeros 15 resultados para la info que viene de la Base de Datos
        });

        const { data } = await axios.get(`${URL}?key=${API_KEY}`);
        const videogameFromApi = data.results.slice(0, 15);  // configuramos que muestre 15 resultados para la busqueda con el nombre, de la info que viene desde la API
        
        
        const combinarDBApiResults = [...videogameFromDB, ...videogameFromApi];

        if (combinarDBApiResults.length > 0) {
            res.status(200).json(combinarDBApiResults);
        } else {
            res.status(404).send('No se encuentran videojuego con este nombre.');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });        
    }
};

module.exports = getVideogamesByName;