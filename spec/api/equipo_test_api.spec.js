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