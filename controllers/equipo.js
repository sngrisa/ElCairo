var equipo = require ('../models/equipo');

exports.equipo_list = function(req, res){
    res.render('equipos/index',{equipos: equipo.allpc});
} 

exports.equipo_create_get = function (req,res){
    res.render('equipos/create');
}

exports.equipo_create_post = function (req,res){
    var pc = new equipo(req.body.id, req.body.procesador, req.body.fuente, req.body.graphics, req.body.motherboard, req.body.almacenamiento, req.body.memoriaram, req.body.gabinete, req.body.disipador);
    equipo.add(pc);
    res.redirect('/equipos');
}

exports.equipo_update_get = function (req,res){
    var pc = equipo.findById(req.params.id);
    res.render('equipos/update', {pc});
}

exports.equipo_update_post = function (req,res){
    var pc= equipo.findById(req.params.id);
    pc.id=req.body.id;
    pc.procesador=req.body.procesador;
    pc.fuente=req.body.fuente;
    pc.graphics=req.body.graphics;
    pc.motherboard=req.body.motherboard;
    pc.almacenamiento=req.body.almacenamiento;
    pc.memoriaram=req.body.memoriaram;
    pc.gabinete=req.body.gabinete;
    pc.disipador=req.body.disipador;
    equipo.add(pc);
    res.redirect('/equipos');
}


exports.equipo_delete_post = function(req,res){
    equipo.removeById(req.body.id);

    res.redirect('/equipos');
}