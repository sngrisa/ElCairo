var mongoose = require('mongoose');
var Equipo = require('../../models/equipo');

describe('Testando Equipos', function () {
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
            var pc = Equipo.createInstance(1, "Pentium G3260", "Corsair CX550M", "AMD RX 550", "H81M-H", "1TB WD", "8GB DDR4", "Generic Case", "Stock");
            expect(pc.code).toBe(1);
            expect(pc.procesador).toBe("Pentium G3260");
            expect(pc.fuente).toBe("Corsair CX550M");
            expect(pc.graphics).toBe("AMD RX 550");
            expect(pc.motherboard).toBe("H81M-H");
            expect(pc.almacenamiento).toBe("1TB WD");
            expect(pc.gabinete).toBe("Generic Case");
            expect(pc.disipador).toBe("Stock");
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
            var pc2 = new Equipo({ code: 1, procesador: "Pentium G3260", fuente: "Corsair CX550M", graphics: "AMD RX 550", motherboard: "H81M-H", memoriaram: "8GB DDR4", gabinete: "Generic Case", disipador: "Stock" });
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

                var aPC = new Equipo({ code: 1, procesador: "Pentium G3260", fuente: "Corsair CX550M", graphics: "AMD RX 550", motherboard: "H81M-H", memoriaram: "8GB DDR3", gabinete: "Generic Case", disipador: "Stock" });
                Equipo.add(aPC, function (err, newPC) {
                    if (err) console.log(err);
                    var pc2 = new Equipo({ code: 2, procesador: "Core i3 4170", fuente: "Corsair CX550M", graphics: "Nvidia GTX 1050 TI", motherboard: "H81M-A", memoriaram: "8GB DDR3", gabinete: "Generic Case", disipador: "Stock" });
                    Equipo.add(pc2, function (err, newPC) {
                        if (err) console.log(err);

                        Equipo.findByCode(1, function (error, targetPC) {
                            expect(targetPC.code).toBe(aPC.code);
                            expect(targetPC.procesador).toBe(aPC.procesador);
                            expect(targetPC.fuente).toBe(aPC.fuente);
                            expect(targetPC.graphics).toBe(aPC.graphics);
                            expect(targetPC.motherboard).toBe(aPC.moherboard);
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