var mongoose = require('mongoose');
var Equipo = require('../../models/equipo');

describe('Testando Equipos', function () {
    beforeAll((done) => { mongoose.connection.close(done) });
    beforeEach(function (done) {
        var mongodb = 'mongodb://localhost/testdb';
        mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Error de conexion'));
        db.once('open', function () {
            console.log('Exitos al conectarse con la base de datos');
        });
        done();
    });

    afterEach(function (done) {
        Equipo.deleteMany({}, function (err, sucess) {
            if (err) console.log(err);
            done();
        });

    });

    describe('Equipo.createInstance', () => {
        it('Se crea una instancia de Equipo', () => {
            var pc = Equipo.createInstance(1, "Intel Pentium G3260", "Corsair CX550M 80 plus bronze", "AMD RX 550 Arez 2gb gddr5 128 bits", "Gigabyte H81M-H", "1TB WD Caviar Blue 7200 RPM", "8GB DDR3 1333 Mhz Kingston", "Generic Case", "Intel Cooler Stock");
            expect(pc.code).toBe(1);
            expect(pc.procesador).toBe("Intel Pentium G3260");
            expect(pc.fuente).toBe("Corsair CX550M 80 plus bronze");
            expect(pc.graphics).toBe("AMD RX 550 Arez 2gb gddr5 128 bits");
            expect(pc.motherboard).toBe("Gigabyte H81M-H");
            expect(pc.almacenamiento).toBe("1TB WD Caviar Blue 7200 RPM");
            expect(pc.memoriaram).toBe("8GB DDR3 1333 Mhz Kingston")
            expect(pc.gabinete).toBe("Generic Case");
            expect(pc.disipador).toBe("Intel Cooler Stock");
        });
    });

    describe('Equipo.allpc', () => {
        it('Lista Vacia', (done) => {
            Equipo.allpc(function (err, equipos) {
                expect(equipos.length).toBe(0);
                done();
            });
        });
    });

    describe('Equipo.add', () => {
        it('Agregamos un equipo', (done) => {
            var pc2 = new Equipo({ code: 1, procesador: "Intel Core i3 4170", fuente: "EVGA 600B 600 Watts 80 plus bronze", graphics: "Nvidia GTX 960 Strix ASUS OC 2GB GDDR5 128 bits", motherboard: "ASUS H81M-A LGA 1150", almacenamiento:"1TB WD Caviar Blue 7200 RPM", memoriaram: "8GB DDR3 1333 Mhz Memox Dual Channel", gabinete: "Sentey Generic Case", disipador: "Cooler Master Hyper EVO 212" });
            Equipo.add(pc2, function (err, pce) {
                if (err) console.log(err);
                Equipo.allpc(function (err, equipos) {
                    expect(equipos.length).toEqual(1);
                    expect(equipos[0].code).toEqual(pc2.code);
                    done();
                });
            });
        });
    });

    describe('Equipo.findByCode', () => {
        it('Se busca el equipo con el id 1', (done) => {
            Equipo.allpc(function (err, equipos) {
                expect(equipos.length).toBe(0);

                var aPC = new Equipo({ code: 1, procesador: "Intel Pentium G3260", fuente: "Corsair CX550M 80 plus bronze", graphics: "AMD R7 360 2GB GDDR5 128 bits OC ASUS Dual", motherboard: "Gigabyte H81M-H LGA 1150", memoriaram: "8GB DDR3 1333 Mhz Kingston", gabinete: "Generic Case", disipador: "Cooler Stock" });
                Equipo.add(aPC, function (err, newPC) {
                    if (err) console.log(err);
                    var pc2 = new Equipo({ code: 2, procesador: "Intel Core i3 4170", fuente: "Seasonic S12II 520 Watts 80 plus bronze", graphics: "Nvidia GTX 1050 TI Rog Strix ASUS 4GB GDDR5 128 bits", motherboard: "ASUS H81M-A", memoriaram: "8GB DDR3 1333 Mhz Kingston", gabinete: "Generic Case", disipador: "Cooler Stock" });
                    Equipo.add(pc2, function (err, newPC) {
                        if (err) console.log(err);

                        Equipo.findByCode(1, function (error, targetPC) {
                            expect(targetPC.code).toBe(aPC.code);
                            expect(targetPC.procesador).toBe(aPC.procesador);
                            expect(targetPC.fuente).toBe(aPC.fuente);
                            expect(targetPC.graphics).toBe(aPC.graphics);
                            expect(targetPC.motherboard).toBe(aPC.motherboard);
                            expect(targetPC.almacenamiento).toBe(aPC.almacenamiento);
                            expect(targetPC.memoriaram).toBe(aPC.memoriaram);
                            expect(targetPC.gabinete).toBe(aPC.gabinete);
                            expect(targetPC.disipador).toBe(aPC.disipador);
                            done();
                        });
                    });

                });
            });

        });
    });


});