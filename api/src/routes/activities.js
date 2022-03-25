/*  
    ROUTES FOR :
    /activities    
*/

const router = require('express').Router();
const { postActivity, getActivities } = require('../services/index.js');

router.post('/', async (req, res) => {
    const search = req.body; // { name, difficulty, duration, season, countries }
    const response = await postActivity(search);
    res.json(response);
})
router.get('/', async (req, res) => {
    const response = await getActivities();
    res.json(response);
})

module.exports = router;