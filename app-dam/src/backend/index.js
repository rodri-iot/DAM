//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

const cors = require('cors');

var express = require('express');
var app = express();
var pool = require('./mysql-connector');
const routerDispositivo = require('./routes/dispositivo')


var corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true // Permitir cookies
}

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));
// to enable cors
app.use(cors(corsOptions));

app.use('/dispositivo', routerDispositivo)

//=======[Generador de Mediciones Aleatorias]==========================================//
const generarMediciones = () => {
    console.log('Obteniendo dispositivos para generar mediciones...');
    const queryDispositivos = 'SELECT dispositivoId FROM Dispositivos';
    const queryInsertMedicion = `
        INSERT INTO Mediciones (dispositivoId, fecha, valor)
        VALUES (?, NOW(), ?)`;

    pool.query(queryDispositivos, (err, dispositivos) => {
        if (err) {
            console.error('Error al obtener dispositivos:', err.message);
            return;
        }

        if (dispositivos.length === 0) {
            console.warn('No se encontraron dispositivos en la base de datos.');
            return;
        }

        dispositivos.forEach(({ dispositivoId }) => {
            const valor = (Math.random() * 100).toFixed(0); // Genera un valor aleatorio entre 0 y 100

            pool.query(queryInsertMedicion, [dispositivoId, valor], (err) => {
                if (err) {
                    console.error(`Error al registrar medición para dispositivo ${dispositivoId}: ${err.message}`);
                } else {
                    console.log(`Medición registrada para dispositivo ${dispositivoId}: ${valor}`);
                }
            });
        });
    });
};


//=======[Configuración de Generación de Mediciones]===================================//
const MEDICION_INTERVAL_MS = 300000; // Intervalo de generación de mediciones en milisegundos (5 minutos)
const RETRASO_INICIAL_MS = 10000; // Retraso inicial en milisegundos (10 segundos)


//=======[Inicialización de Generador Periódico]======================================//
const iniciarGenerador = () => {
    console.log(`Iniciando generación periódica de mediciones en ${RETRASO_INICIAL_MS / 1000}s...`);

    setTimeout(() => {
        console.log('Generador de mediciones iniciado.');
        generarMediciones(); // Ejecuta inmediatamente al inicio

        setInterval(() => {
            console.log('Generando nuevas mediciones...');
            generarMediciones();
        }, MEDICION_INTERVAL_MS);
    }, RETRASO_INICIAL_MS);
};

//=======[Inicio del Script]==========================================================//
iniciarGenerador();

//=======[ Main module code ]==================================================

app.get('/', function(req, res, next) {
    res.send({'mensaje': 'Hola DAM'}).status(200);
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
