const knex = require('knex');

const { getYearsFromNow } = require('../utils/dateUtils');
const { getDensity } = require('../utils/cityUtils');
const { config } = require('../config/configuration');

// Configuración de la base de datos: tipo, ubicación y otros parámetros
const db = knex({
    client: 'mysql',
    connection: {
        host: config.db.host,
        port: config.db.port,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    },
    useNullAsDefault: true
});

const findCities = (async () => {
    const result = await db('cities').select('*');

    return result;
});

const findCity = (async (cityId) => {
    const result = await db('cities').select('*').where({id: cityId}).first();

    return result;
});

const cityExists = (async (name) => {

});

const registerCity = (async (name, population, altitude, foundationDate, area) => {
    const age = getYearsFromNow(new Date(foundationDate));
    const density = getDensity(population, area);
    let cityId;

    const returning = await db('cities')
        .insert({
            name: name,
            population: population,
            altitude: altitude,
            foundation_date: foundationDate,
            age: age,
            area: area,
            density: density
        }).then( async (ids) => {
            cityId = ids[0];
        });

    const result = {
        id: cityId,
        age: age,
        density: density
    };

    return result;
});

const modifyCity = (async (cityId, name, population, altitude) => {
    // TODO Modificar el resto de campos
    return await db('cities').where({ id: cityId }).update({
        name: name,
        population: population,
        altitude: altitude
    });
});

const removeCity = (async (cityId) => {
    return await db('cities').del().where({id: cityId});
});

module.exports = {
    findCities,
    findCity,
    registerCity,
    modifyCity,
    removeCity
};