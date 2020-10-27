var mongoose = require('mongoose');
var Equipo = require('../../models/equipo');
var Reserva = require('../../models/reserva');
var Usuario = require('../../models/usuario');

describe('Testeando Usuarios', function(){

    beforeAll((done) => { mongoose.connection.close(done) });
    beforeEach(function(done){
        var mongodb = 'mongodb://localhost/testdb';
        mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Error al conectarse a la base de datos'));
        db.once('open', function(){
            console.log('Conexion Exitosa con la base de datos');
        });
        done();
    });

    afterEach(function(done){
        Reserva.deleteMany({}, function(err,success){
            if(err){
                console.log(err);
            } 
        });
        Usuario.deleteMany({}, function(err,success){
            if(err){
                console.log(err);
            } 
        });
        Equipo.deleteMany({}, function(err,success){
            if(err){
                console.log(err);
            } 
        });
        done();
    });

    describe('Cuando un Usuario reserva la compra de un equipo', () =>{
        it('Debe Existir la reserva', (done) => {

            const usuario = new Usuario({
                nombre: 'user',
                email: 'user@test.com',
                password: '432394'
            })
            usuario.save();

            const equipo = new Equipo({
                code: 1,
                procesador: "AMD Athlon 200GE 3,2 Ghz",
                fuente: "Corsair CX650M 450 Watts 80 plus bronze",
                graphics: "AMD RX 550 Arez 2gb gddr5 128 bits ASUS",
                motherboard: "Asus Prime A320M-K",
                almacenamiento: "Western Digital Caviar Blue 7200 RPM 1TB",
                memoriaram: "8GB DDR4 2400 Mhz Single Channel Kingston Value",
                gabinete: "Generic Perfomance ATX",
                disipador: "AMD Cooler Stock"
            })
            equipo.save();

            var hoy = new Date();
            var mañana = new Date();
            mañana.setDate(hoy.getDate() +1);

            usuario.reservar(equipo.id, hoy, mañana, function(error,reserva){
                Reserva.find({}).populate('equipo').populate('usuario').exec((err,reservas) => {
                    console.log(reservas[0]);

                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].equipo.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();

                })
            })
        })
    });

});