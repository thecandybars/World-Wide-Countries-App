const { Router } = require('express');

const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriesRouter = require('./countries.js');
const activitiesRouter = require('./activities.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countriesRouter);
router.use('/activities', activitiesRouter);

module.exports = router;
