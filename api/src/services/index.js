const axios = require('axios');
const { Op } = require('sequelize');
const { Country, Activity } = require('../db.js');

async function getCountriesAPI() {
    const { data } = await axios.get('https://restcountries.com/v3/all');
    // Toma solo la data necesaria
    const apiDataSelected = data.map(country => {
        return {
            id: country.cca3,
            name: country.name.common,
            flag: country.flags ? country.flags[0] : "",
            flag_icon: country.flag ? country.flag : "N/A",
            region: country.region ? country.region : "N/A",
            subregion: country.subregion,
            capital: country.capital ? country.capital[0] : "N/A",
            area: Number(country.area),
            population: Number(country.population),
        }
    })
    // Escribe la DB : si no existe lo crea, si existe lo actualiza

    // await Country.bulkCreate(apiDataSelected);
    
    await Promise.all(apiDataSelected.map(apiCountry => Country.findOrCreate(
        {
            where: { id: apiCountry.id },
            defaults: apiCountry,
        })));

    // apiDataSelected.forEach(async (apiCountry) => {
    //     let [dbCountry, created] = await Country.findOrCreate({
    //         where: { id: apiCountry.id },
    //         defaults: apiCountry,
    //     });
    //     // Si fue creado, no hay necesidad de actualizarlo. Encambio:
    //     if (!created) {
    //         for (const prop in apiCountry) {
    //             dbCountry[prop] = apiCountry[prop];
    //         }
    //         await dbCountry.save();
    //     }
    // })
    return await Country.findAll({ include: Activity });
}

// Busca en la BD por id (exacto) o name del pais (no debe ser preciso)
 async function getCountriesBD(search) {
    // Verificar los datos que llegan por search??
    const { idPais, name } = search;
    let response = false;
    console.log("🚀 ~ file: index.js ~ line 53 ~ getCountriesBD ~ idPais", idPais)
    if (idPais) response = await Country.findByPk(idPais, { include: Activity });
    else if (name) response = await Country.findAll({
        where: { name: { [Op.iLike]: `%${name}%` }, include: Activity }
    })

    return response;
}

async function postActivity(search) {
    const { name, difficulty, duration, season, countries } = search;
    const response = await Activity.create({ name, difficulty, duration, season, });
    const idActivity = response.id;

    if (countries && countries.length > 0) {
        countries.forEach(async (countryId) => {
            const country = await Country.findByPk(countryId);
            country.addActivity(idActivity);
        })
    }
    return response;
}

async function getActivities() {
    const activities = await Activity.findAll({
        attributes: ['name'],
        raw: true   // resultado en forma de obj
    });
    const uniqueActivities = activities
        .map(obj => obj.name)   // convierte el obj en arr
        .filter((item, index, arr) => arr.indexOf(item) === index);  // filtra repeticiones

    return uniqueActivities;
}
module.exports = {
    getCountriesAPI, getCountriesBD, postActivity, getActivities
}