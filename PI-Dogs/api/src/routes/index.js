const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const DogRouter = require('./dogs');
const TempRouter = require('../routes/temperaments')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', DogRouter);
router.use('/', TempRouter);


module.exports = router;
