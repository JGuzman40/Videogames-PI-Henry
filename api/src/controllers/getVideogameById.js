require('dotenv').config();
const { Videogame } = require('../db');
const axios = require('axios');

const API_KEY = process.env.API_KEY;

const getVideogamesById = async (req, res) => {
    const { idVideogame } = req.params;
    const URL = `https://api.rawg.io/api/games/${idVideogame}`;

    try {
        const videogameFromDB = await Videogame.findOne({ // consulta a la base de datos
            where: { id: idVideogame },
            include: [{ model: Genre, through: Game_Genre }],
        });

        if (videogameFromDB) {
            const { name, description, platforms, image, releaseDate, rating } = videogameFromDB.dataValues;

            const { data } = await axios.get(`${URL}?key=${API_KEY}`); // consulta a la API

            const infoCombinada = {
                id: idVideogame,
                name,
                description,
                platforms,
                image,
                releaseDate,
                rating,
                genres: data.results[0].genres,
            }
            res.status(200).json(infoCombinada);
        } else {
            res.status(404).send('Videojuego no encontrado en la base de datos'); // manejamos el error el el caso de encontrar el videojuego en la base de datos
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getVideogamesById;
