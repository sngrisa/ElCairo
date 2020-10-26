const { restart } = require('nodemon');
const Equipos = require('../../models/equipo2');

exports.equipo_list = function(req, res){
    res.status(200).json({
     equipos: Equipos.allpc
    });
}

exports.equipo_create = function(req,res){
    var pc = new Equipos(req.body.id, req.body.procesador, req.body.fuente, req.body.graphics, req.body.motherboard, req.body.almacenamiento, req.body.memoriaram, req.body.gabinete, req.body.disipador);
    Equipos.add(pc);

    res.status(200).json({
        equipos: pc
    });
}

exports.equipo_delete = function(req,res){
    Equipos.removeById(req.body.id);
    res.status(204).send();
}

exports.equipo_update = function (req,res){
    var pc=Equipos.findById(req.body.id);
    pc.id=req.body.id;
    pc.procesador=req.body.procesador;
    pc.fuente=req.body.fuente;
    pc.graphics=req.body.graphics;
    pc.motherboard=req.body.motherboard;
    pc.almacenamiento=req.body.almacenamiento;
    pc.memoriaram=req.body.memoriaram;
    pc.gabinete=req.body.gabinete;
    pc.disipador=req.body.disipador;
    res.status(200).json({
        equipos: pc
    });
}
