const express = require('express');
const { getCities, getCity, postCity, putCity, deleteCity } = require('../controller/cities');
const router = express.Router();

router.get('/cities', getCities);
router.get('/cities/:city', getCity);
router.post('/cities', postCity);
router.put('/cities/:city', putCity);
router.delete('/cities/:city', deleteCity);

module.exports = router;