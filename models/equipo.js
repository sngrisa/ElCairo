var Equipos = function(id, procesador, fuente, graphics, motherboard, almacenamiento, memoriaram, gabinete, disipador){
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
Equipos.prototype.toString = function(){
    return 'Id:' +this.id+ "| Procesador:" +this.procesador+ "| Fuente: "+this.fuente+ 
    "| Placa de Video: "+this.graphics+ "| Placa Madre:" +this.motherboard+ "| Almacenamiento :"
     +this.almacenamiento+ "| Memoria Ram:" +this.memoriaram+ "| Gabinete:" +this.gabinete+ 
     "|Disipador :" +this.disipador;
}

Equipos.allpc = [];
Equipos.add = function(aPC){
    Equipos.allpc.push(aPC);
}

var a = new Equipos (1, 'AMD Athlon 200GE', 'Corsair CX550M','Nvidia GTX 1050 ASUS DUAL OC 2GB GDDR5 128 bits',"Asus Prime A320M-K","1TB WD Caviar Blue 7200 RPM HDD","8GB DDR4 2400 Mhz Kingston","Gabinete Generico","AMD Cooler Stock");
var b = new Equipos (2, 'AMD Athlon 3000G', 'Corsair CX550M','Nvidia GTX 1050 ASUS DUAL OC 2GB GDDR5 128 bits',"Asus Prime A320M-K","1TB WD Caviar Blue 7200 RPM HDD","8GB DDR4 2400 Mhz Kingston","Gabinete Generico","AMD Cooler Stock");

Equipos.add(a);
Equipos.add(b);

Equipos.findById = function (aPCId){
    var aPC = Equipos.allpc.find(x => x.id == aPCId);
    if(aPC)
        return aPC;
    else
        throw new Error(`No existe un equipo con el id buscado ${aPCId}`);
}

Equipos.removeById= function(aPCId){
    for(var i=0; i<Equipos.allpc.length; i++){
        if(Equipos.allpc[i].id == aPCId){
            Equipos.allpc.splice(i, 1);
            break;
        }
    }
}

module.exports = Equipos;