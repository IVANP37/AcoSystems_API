// Endpoints for external data
const { Router } = require('express');
const router = new Router();

const fetch = require('node-fetch');

router.get('/', (req, res) => {
    const data = {
        Author: 'Ivan Portuondo',
        Version: '1.0.0',
        App:"AlcoSystems activa"
    };
    res.json(data);
});  

module.exports = router;