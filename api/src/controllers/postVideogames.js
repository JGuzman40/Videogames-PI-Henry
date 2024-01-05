require('dotenv').config();
const { Videogame, Genre, Game_Genre } = require('../db');
const { validacionCreateGame } = require('../utils/validationsCreateGame');

const createVideogame = async (req, res) => {
    
        const { name, description, platforms, image, releaseDate, rating, genres } = req.body;

        //  validaciones necesarias para crear el videojuego
        const validacionesErrors = validacionCreateGame(req.body);
        if (validacionesErrors.length > 0){
            return res.status(400).json({ errors: validacionesErrors });
        }

        try {
        // Crear el videojuego en la base de datos
        const newVideogame = await Videogame.create({
            name,
            description,
            platforms,
            image,
            releaseDate,
            rating,
            genres,
        });

        // Asociar el videojuego con los géneros indicados
        if (genres && genres.length > 0) {
            const genresToAssociate = await Genre.findAll({ where: { name: genres } });

            if (genresToAssociate && genresToAssociate.length > 0) {
                await newVideogame.addGenres(genresToAssociate);
            } else {
                // Manejar el caso de géneros no encontrados
                res.status(400).send('Alguno de los géneros especificados no existe.');
                return;
            }
        } else {
            // Manejar el caso de que no se hayan proporcionado géneros
            res.status(400).send('Debes proporcionar al menos un género para el videojuego.');
            return;
        }

        res.status(201).json(newVideogame);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = createVideogame;
