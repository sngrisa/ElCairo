const Equipos = require('../../models/equipo');

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
