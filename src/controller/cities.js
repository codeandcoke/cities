const { findCities, registerCity, modifyCity, removeCity } = require("../service/cities");

const getCities = (async (req, res) => {
    const cityList = await findCities();

    cityList.forEach((item) => {
        item.foundationDate = item.foundation_date,
        delete item.foundation_date
    });

    res.status(200).json(cityList);
});

const getCity = (async (req, res) => {
    const city = await findCity(req.params.city);

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
    await modifyCity(req.params.name, req.body.population, req.body.altitude);

    res.status(204).json({});
});

const deleteCity = (async (req, res) => {
    // TODO Validaciones y comprobaciones
    await removeCity(req.params.name);
    
    res.status(204).json({})
});

module.exports = {
    getCities,
    getCity,
    postCity,
    putCity,
    deleteCity
};