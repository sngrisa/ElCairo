var express = require('express');
var router = express.Router();
var equipoController = require ('../controllers/equipo');

router.get('/', equipoController.equipo_list);
router.get('/create', equipoController.equipo_create_get);
router.post('/create', equipoController.equipo_create_post);
router.get('/:id/update', equipoController.equipo_update_get);
router.post('/:id/update', equipoController.equipo_update_post);
router.post('/:id/delete', equipoController.equipo_delete_post);

module.exports = router;