//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

var express = require('express');
const routerDispositivos = require('./routes/dispositivos');
var app = express();

var pool = require('./mysql-connector')

const cors = require('cors')

const corsOptions = {
    origin: '*',
}

app.use(cors(corsOptions))
// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));

// app.all('/dispositivos', function(req, res) {
//     res.send({'mensaje': 'Hola DAM'})
// })

var cb0 = function(err, req, res, next) {
    // El usuario está autenticado?
    next()
    // El usuario no está autenticado
    // res.send({'mensaje': 'Falta autenticación'}).status(403)
    console.log('CB0')
}

var cb1 = function(req, res, next) {
    console.log('CB1')
    // Saneamiento de la request
    next()
}

var cb2 = function(req, res, next) {
    // Interactúa con la base de datos
    res.send({'mensaje': 'Hola DAM'}).status(200)
}

app.get('/', [cb0, cb1, cb2])
app.use(cb1)

app.use('/dispositivos', routerDispositivos)
//=======[ Main module code ]==================================================

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});
