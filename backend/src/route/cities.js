const express = require('express');
const { getCities, getCity, postCity, putCity, deleteCity } = require('../controller/cities');
const router = express.Router();

router.get('/cities', getCities);
router.get('/cities/:cityId', getCity);
router.post('/cities', postCity);
router.put('/cities/:cityId', putCity);
router.delete('/cities/:cityId', deleteCity);

module.exports = router;