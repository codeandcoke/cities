const express = require('express');

const cities = require('./route/cities');
const { config } = require('./config/configuration');
const promClient = require('prom-client');
const cors = require('cors');
const { httpRequestDurationSeconds, httpRequestsTotal, inFlightRequests } = require('./config/metrics');

const app = express();
app.use(express.json());
app.use(cors());

// Recoge métricas por defecto
promClient.collectDefaultMetrics();
// Recoger las métricas configuradas en config/metrics
app.use((req, res, next) => {
    // Anota la request en vuelo
    inFlightRequests.inc();

    // Inicia un timer para comenzar a calcular la duración de la request
    const end = httpRequestDurationSeconds.startTimer();

    const method = req.method;
    const path = req.route ? req.route.path : req.path; 

    // Cada vez que una request termina, se recogen las métricas configuradas
    res.on('finish', () => {
        const statusCode = res.statusCode;

        // Captura la duración de la petición
        end({ method, path, code: statusCode }); 
        // Incrementa el contador de peticiones HTTP
        httpRequestsTotal.inc({
            code: statusCode,
            method: method.toLowerCase(),
            path: path
        });

        // Decrementa el contador de peticiones en vuelo
        inFlightRequests.dec();
    });

    next();
});

// Define el endpoint que usará prometheus para recoger las métricas
app.get('/metrics', async(req, res) => {
    try {
        res.set('Content-Type', promClient.register.contentType);
        res.end(await promClient.register.metrics());
    } catch (error) {
        res.status(500).end(error);
    }
});

app.use('/', cities);

app.listen(config.service.port, () => {
    console.log('Iniciando el backend en el puerto ' + config.service.port);
});

module.exports =  { app };
