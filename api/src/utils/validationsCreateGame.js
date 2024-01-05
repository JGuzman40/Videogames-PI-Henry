const { DataTypes } = require('sequelize');

const validacionCreateGame = (body) => {
    const errors = [];

    if (!body.name || body.name.trim() === '') {
        errors.push('El campo "name" es requerido.');
    }

    if (body.description && !(body.description instanceof DataTypes.TEXT)) {
        errors.push('El campo "description" debe ser de tipo TEXT.');
    }

    if (body.platforms && typeof body.platforms !== DataTypes.STRING) {
        errors.push('El campo "platforms" debe ser de tipo STRING.');
    }

    if (body.image && typeof body.image !== DataTypes.STRING) {
        errors.push('El campo "image"debe ser un STRING.');
    }

    if (body.releaseDate && typeof body.releaseDate !== DataTypes.DATE) {
        errors.push('El campo "releaseDate" debe ser de tipo DATE.');
    }

    if (body.rating && typeof body.rating !== DataTypes.FLOAT) {
        errors.push('El campo "rating" debe ser de tipo FLOAT.');
    }

    if(body.genres && !Array.isArray(body.genres)) {
        errors.push('El campo "genres" debe ser un array.');
    }

    return errors;
};

module.exports = {
    validacionCreateGame,
}