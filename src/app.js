const express = require('express');

const cities = require('./route/cities');
const { config } = require('./config/configuration');

const app = express();
app.use(express.json());

app.use('/', cities);

app.listen(config.service.port, () => {
    console.log('Iniciando el backend en el puerto ' + config.service.port);
});

module.exports =  { app };
