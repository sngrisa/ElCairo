var equipo = function(id, procesador, fuente, graphics, motherboard, almacenamiento, memoriaram, gabinete, disipador){
    this.id= id;
    this.procesador= procesador;
    this.fuente= fuente;
    this.graphics= graphics;
    this.motherboard= motherboard;
    this.almacenamiento= almacenamiento;
    this.memoriaram= memoriaram;
    this.gabinete= gabinete;
    this.disipador= disipador;
}
equipo.prototype.toString = function(){
    return 'id:' +this.id+ "| Procesador:" +this.procesador+ "| Memoria Ram: "+this.memoriaram+ "| Placa de video: "+this.graphics+ "| Gabinete:" +this.gabinete+ "| Disipador:" +this.disipador+ "| Motherboard:" +this.motherboard+ "| Almacenamiento:" +this.almacenamiento+ "|Fuente :" +this.fuente;
}

equipo.allpc = [];
equipo.add = function(aPC){
    equipo.allpc.push(aPC);
}

equipo.findById = function(id){
    var PC = equipo.allpc.find(x => x.id == id);
    if(PC)
        return PC;
    else
    throw new Error(`No existe un equipo con el id buscado ${id}`);
}

equipo.removeById= function(aPCId){
    for(var i=0; i<equipo.allpc.length; i++){
        if(equipo.allpc[i].id == aPCId){
            equipo.allpc.splice(i, 1);
            break;
        }
    }
}


var a = new equipo (1, 'AMD Athlon 200GE', 'Corsair CX550M','Nvidia GTX 1050 ASUS DUAL OC 2GB GDDR5 128 bits',"Asus Prime A320M-K","1TB WD Caviar Blue 7200 RPM HDD","8GB DDR4 2400 Mhz Kingston","Gabinete Generico","AMD Cooler Stock");
var b = new equipo (2, 'AMD Athlon 3000G', 'Corsair CX550M','Nvidia GTX 1050 ASUS DUAL OC 2GB GDDR5 128 bits',"Asus Prime A320M-K","1TB WD Caviar Blue 7200 RPM HDD","8GB DDR4 2400 Mhz Kingston","Gabinete Generico","AMD Cooler Stock");

equipo.add(a);
equipo.add(b);

module.exports = equipo;