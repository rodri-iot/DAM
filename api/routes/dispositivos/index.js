const express = require('express')

const routerDispositivos = express.Router()

routerDispositivos.get('/', function(req, res) {
    console.log('Estoy en dispositivos')
    res.send({'dispositivos': 'dispositivo1'}).status(200)
})

module.exports = routerDispositivos