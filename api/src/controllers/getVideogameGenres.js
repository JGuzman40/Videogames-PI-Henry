const { Genre } = require('../db');
const axios = require('axios');

const URL = `https://api.rawg.io/api/genres`

const getVideogamesGenre = async (req, res) => {
    try {
        const genresFromDB = await Genre.findAll();  // primero en esta linea vaos a verificar si los generos estan en la BD

        if (genresFromDB.length === 0) {  // si no hubieran géneros en la base de datos, entonces los traemos de la api
            const { data } = await axios.get(`${URL}`);
            const genresFromApi = data.results.map(apiGenre => ({ name: apiGenre.name }));

            const createGenres = await Genre.bulkCreate(genresFromApi); // bulkCreate es un metodo de Sequelize ORM (Object-relational map)
                                                                        //  es una forma eficiente de insertar múltiples registros en la base de datos al mismo tiempo, reduciendo la cantidad de operaciones de base de datos individuales y mejorando el rendimiento de la aplicación.
            res.status(201).json(createGenres);
        } else {
            res.status(200).json(genresFromDB);
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};
module.exports = getVideogamesGenre;