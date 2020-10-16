const express = require('express');
const router = express.Router();
const equipoController = require('../../controllers/api/equipocontrollerapi');

router.get('/', equipoController.equipo_list);
router.get('/create', equipoController.equipo_create);

module.exports = router;