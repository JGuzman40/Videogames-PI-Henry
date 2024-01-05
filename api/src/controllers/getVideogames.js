require('dotenv').config();
const axios = require('axios');
const URL = `https://api.rawg.io/api/games`;

const getVideogames = async (req, res) => {
    try {
        const API_KEY = process.env.API_KEY;
        const page = parseInt(req.query.page) || 1; // por defecto toma la pagina 1
        const pageSize = parseInt(req.query.pageSize) || 10; // por defecto muestra 10 resultados por página

        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize  // aqui estaría calculando el índice de inicio y final de la paginación

        const { data } = await axios.get(`${URL}?key=${API_KEY}`);
        const allgames = data.results;  // solicitud de información a la API

        const paginadoJuegos = allgames.slice(startIndex, endIndex); // esto aplica la paginación a los resultados dandole la capacidad de mostrar 10 juegos por página

        res.status(200).json(paginadoJuegos);
    } catch (error) {
        res.status(500).json({ error: error.message });   
    }
};

module.exports = getVideogames;