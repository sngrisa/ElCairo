var Equipo2 = function(id, nombre, ubicacion){
    this.id= id;
    this.nombre= nombre;
    this.ubicacion=ubicacion;
    
}

Equipo2.prototype.toString = function(){
    return 'Id:' +this.id+ "| Nombre:" +this.nombre+ "| Ubicacion:" +this.ubicacion;
}

Equipo2.allEquipos = [];
Equipo2.add = function(Equipo){
    Equipo2.allEquipos.push(Equipo);
}

module.exports = Equipo2;