const { findCities, findCity, registerCity, modifyCity, removeCity } = require("../service/cities");

const getCities = (async (req, res) => {
    const cityList = await findCities();

    cityList.forEach((item) => {
        item.foundationDate = item.foundation_date,
        delete item.foundation_date
    });

    res.status(200).json(cityList);
});

const getCity = (async (req, res) => {
    const cityId = parseInt(req.params.cityId);

    if (!Number.isInteger(cityId)) {
        res.status(400).json({
            status: 'bad-request',
            message: 'cityId is not a valid number'
        });
        return;
    }

    const city = await findCity(cityId);

    if (city === undefined) {
        res.status(404).json({
            status: 'not-found',
            message: 'City not found'
        });
        return;
    }

    res.status(200).json({
        id: city.id,
        name: city.name,
        population: city.population,
        altitude: city.altitude,
        foundationDate: city.foundation_date,
        age: city.age,
        area: city.area,
        density: city.density
    });
});

const postCity = (async (req, res) => {
    if (req.body.name === undefined || req.body.name === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'name field is mandatory'
        });
        return;
    }

    if (req.body.population <= 0) {
        res.status(400).json({
            status: 'bad-request',
            message: 'population must be greater than 0'
        });
        return;
    }
    // TODO Añadir más validaciones (fecha, por ejemplo)

    const result = await registerCity(req.body.name, req.body.population, req.body.altitude, req.body.foundationDate, req.body.area);

    res.status(201).json({
        id: result.id,
        name: req.body.name,
        population: req.body.population,
        altitude: req.body.altitude,
        foundationDate: req.body.foundationDate,
        age: result.age,
        area: req.body.area,
        density: result.density
    });
});

const putCity = (async (req, res) => {
    const cityId = parseInt(req.params.cityId);
    
    if (!Number.isInteger(cityId)) {
        res.status(400).json({
            status: 'bad-request',
            message: 'cityId is not a valid number'
        });
        return;
    }

    const modified = await modifyCity(cityId, req.body.name, req.body.population, req.body.altitude);

    if (!modified) {
        res.status(404).json({
            status: 'not-found',
            message: 'city not found'
        });
        return;
    }

    res.status(204).json({});
});

const deleteCity = (async (req, res) => {
    const cityId = parseInt(req.params.cityId);

    if (!Number.isInteger(cityId)) {
        res.status(400).json({
            status: 'bad-request',
            message: 'cityId is not a valid number'
        });
        return;
    }

    const removed = await removeCity(cityId);
    if (!removed) {
        res.status(404).json({
            status: 'not-found',
            message: 'city not found'
        });
        return;
    }

    res.status(204).json({});
});

module.exports = {
    getCities,
    getCity,
    postCity,
    putCity,
    deleteCity
};