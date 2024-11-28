const express = require('express')


const routerDispositivo = express.Router()


var pool = require('../../mysql-connector');

// GET (Obtener todos los dispositivos)
routerDispositivo.get('/', function(req, res) {
    pool.query('Select * from Dispositivos', function(err, result, fields) {
        if (err) {
            console.error('Error al consultar dispositivos:', err);
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    });
})

// GET (Obtener un dispositivo por id)
routerDispositivo.get('/:id', (req, res) => {
    const dispositivoId = parseInt(req.params.id, 10);
    if (isNaN(dispositivoId)) {
        return res.status(400).json({ error: 'El ID debe ser un número válido' });
    }

    const query = `
        SELECT d.dispositivoId, d.nombre AS dispositivoNombre, d.ubicacion,
               e.electrovalvulaId, e.nombre AS electrovalvulaNombre
        FROM Dispositivos d
        INNER JOIN Electrovalvulas e ON d.electrovalvulaId = e.electrovalvulaId
        WHERE d.dispositivoId = ?`;

    pool.query(query, [dispositivoId], (err, result) => {
        if (err) {
            console.error('Error al obtener el dispositivo:', err);
            return res.status(500).json({ error: 'Error al obtener el dispositivo' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Dispositivo no encontrado' });
        }
        res.status(200).json(result[0]);
    });
});

// POST (Actualizar estado de la válvula)
routerDispositivo.post('/:id/valvula', (req, res) => {
    const dispositivoId = parseInt(req.params.id, 10);
    const { apertura } = req.body;

    if (isNaN(dispositivoId) || (apertura !== 0 && apertura !== 1)) {
        return res.status(400).json({ error: 'Datos inválidos. Apertura debe ser 0 o 1, y el ID un número válido.' });
    }

    const fecha = new Date();
    const queryLog = `
        INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId)
        SELECT ?, ?, electrovalvulaId
        FROM Dispositivos
        WHERE dispositivoId = ?`;

    pool.query(queryLog, [apertura, fecha, dispositivoId], (err, result) => {
        if (err) {
            console.error('Error al registrar el riego:', err);
            return res.status(500).json({ error: 'Error al registrar el riego' });
        }
        res.status(200).json({ mensaje: `Válvula ${apertura ? 'abierta' : 'cerrada'} correctamente` });
    });
});


// GET (Obtener lectura de mediciones por id de dispositivo)
routerDispositivo.get('/:id/mediciones', (req, res) => {
    const dispositivoId = parseInt(req.params.id, 10);
    if (isNaN(dispositivoId)) {
        return res.status(400).json({ error: 'El ID debe ser un número válido' });
    }

    const query = `
        SELECT medicionId, fecha, valor
        FROM Mediciones
        WHERE dispositivoId = ?
        ORDER BY fecha DESC`;

    pool.query(query, [dispositivoId], (err, result) => {
        if (err) {
            console.error('Error al obtener las mediciones:', err);
            return res.status(500).json({ error: 'Error al obtener las mediciones' });
        }
        if (result.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron mediciones para este dispositivo.' });
        }
        res.status(200).json(result);
    });
});

module.exports = routerDispositivo