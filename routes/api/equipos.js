const express = require('express');
const router = express.Router();
const equipoController = require('../../controllers/api/equipocontrollerapi');

router.get('/', equipoController.equipo_list);
router.post('/create', equipoController.equipo_create);
router.delete("/delete", equipoController.equipo_delete);
router.post('/update', equipoController.equipo_update);

module.exports = router;