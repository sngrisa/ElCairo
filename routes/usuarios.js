var express = require('express');
var router = express.Router();
const usuarioscontroller = require('../controllers/usuarios');

router.get('/', usuarioscontroller.list);
router.get('/create', usuarioscontroller.create_get);
router.post('/create', usuarioscontroller.create);
router.get('/:id/update', usuarioscontroller.update_get);
router.post('/:id/update', usuarioscontroller.update);
router.post('/:id/delete', usuarioscontroller.delete);

module.exports = router;