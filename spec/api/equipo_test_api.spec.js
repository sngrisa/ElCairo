var Equipos = require ('../../models/equipo');
var request = require ('request');
var server = require ('../../bin/www');

describe('Equipo API', () => {
    describe('Get Equipos /', () => {
        it('Status 200', () => {
            expect(Equipos.allpc.length).toBe(0);

            var a = new Equipos (1,'Intel Core i3 4170','EVGA 600B','Nvidia GTX 960 Strix 2GB GDDR5 128 bits OC','ASUS H81M-A LGA 1150','1 TB WD Caviar Blue 7200 RPM HDD','8GB DDR3 1333 Mhz Memox Dual Channel','Cooler Master CM 590 III Black','Cooler Master Hyper EVO 212');
            Equipos.add(a);

            request.get('http://localhost:3000/api/equipos', function(error, response, body){
                expect(response.statusCode.toBe(200));
            });
        });
    });
});

describe('POST EQUIPOS /create',() =>{
    it('STATUS 200', (done) =>{
        var headers = {'content-type' : 'application.json'};
        var aPC = {"id": 10, "procesador": 'AMD Ryzen 1300X', "fuente": 'Seasonic Focus Gold Plus 650 Watts 80 plus gold', "graphics": 'Nvidia GTX 1050 TI MSI Gaming X 4GB GDDR5 128 bits OC', "motherboard": 'ASUS Prime A320M-K AM4', "almacenamiento":'1TB WD Caviar Blue 7200 RPM', "memoriaram": '16GB DDR4 2400 Mhz Kingston Hyper Fury X Dual Channel', "gabinete": 'Cooler Master CM 590 III Black', "disipador": 'AMD Cooler Stock'};
        request.post({
            headers: headers,
            url: 'http://localhost:3000/api/equipos/create',
            body: aPC,
        }, function(error, response, body){
            expect(response.statusCode).toBe(200);
            expect(Equipos.findById(10).procesador).toBe("AMD Athlon 200GE");
            done();
        });
    });
});