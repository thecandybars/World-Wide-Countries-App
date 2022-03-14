const router = require('express').Router();
const { getCountriesAPI, getCountriesBD } = require('../services/index.js');

// Esta ruta contiene dos funcionalidades sumamente diferentes.
// Por claridad, sería mejor separarlas en 2 bloques separados.
router.get('/', async (req, res) => {
    const { name } = req.query;
    if (!name) {
        // '/' : Extrae data de la API y la importa a la BD
        const response =  await getCountriesAPI();
        res.json(response);
    } else {
        // '/?name' : Busca por NAME el la BD
        const search = req.query;
        const response = await getCountriesBD(search);
        if (response) res.json(response);
        else res.status(404).send('No se encontró un país de nombre ' + search.name);
    }
})
//router.get('/?name')// Probar ruta /countries/?name

router.get('/:idPais', async (req, res) => {
    // Busca por id en la BD
    const search = req.params;
    const response = await getCountriesBD(search);
    if (response) res.json(response);
    else res.status(404).send('No se encontró un país con código ' + search.idPais);
})

module.exports = router;