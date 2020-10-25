var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipoSchema = new Schema({
    code: Number,
    procesador: String,
    fuente: String,
    graphics: String,
    motherboard: String,
    almacenamiento: String,
    memoriaram: String,
    gabinete: String,
    disipador: String,
});

EquipoSchema.statics.createInstance = function(code, procesador, 
                            fuente,graphics,motherboard,almacenamiento,
                            memoriaram,gabinete,disipador){
    return new this({
        code: code,
        procesador: procesador,
        fuente: fuente,
        graphics: graphics,
        motherboard: motherboard,
        almacenamiento: almacenamiento,
        memoriaram: memoriaram,
        gabinete: gabinete,
        disipador: disipador
    });
};

EquipoSchema.methods.toString = function(){
    return 'id:' +this.code+ "| procesador:" +this.procesador+ "| fuente: "+this.fuente+ 
    "| graphics: "+this.graphics+ "| motherboard:" +this.motherboard+ "| almacenamiento :"
     +this.almacenamiento+ "| memoriaram:" +this.memoriaram+ "| gabinete:" +this.gabinete+ 
     "|disipador :" +this.disipador;
    };
    
EquipoSchema.statics.allpc = function (cb){
    return this.find({}, cb);
};
    
EquipoSchema.statics.add = function (aPC, cb) {
    this.create(aPC, cb);
};

EquipoSchema.statics.findByCode = function (aCode, cb) {
    return this.findOne({ code: aCode }, cb);
};

EquipoSchema.statics.removeByCode = function (aCode, cb) {
    return this.deleteOne({ code: aCode }, cb); //{} => criterio de filtrado
};

module.exports = mongoose.model('Equipo', EquipoSchema);
