var Equipo = require('../../models/equipo2');
var request = require('request');
var server = require('../../bin/www');

describe(' EQUIPOS API', () => {

    describe('GET EQUIPOS /', () => {
        it('Status 200', () => {
            expect(Equipo.allpc.length).toBe(2);

            var a = new Equipo(1, 'Intel Core i3 530', 'EVGA 500 W1', 'Nvidia 9600 GSO 512 1,5 GB DDR2 EVGA 192 bits', 'Intel DH55PJ Motherboard', '8GB DDR3 1333 Memox Dual Channel', 'Sentey Gabinete Generico', 'Intel Cooler Stock');
            Equipo.add(a);
            request.get('http://localhost:3000/api/equipos', function (error, response, body) {
                expect(response.statusCode).toBe(200);
            });

        });
    });
});


describe('POST EQUIPOS /create', () => {
    it('STATUS 200', (done) => {
        var headers = { 'content-type': 'application/json' };
        var aPC = '{"id": 2 , "procesador":"Intel Core i5 650", "fuente":"Sentey P4 600 Watts", "graphics": "Nvidia GT 740 1GB GDDR5 128 bits OC ASUS", "motherboard": "Intel DH55PJ", "almacenamiento": "Samsung HD502 500GB 7200RPM HDD", "memoriaram": "4GB DDR3 1333 Mhz Kingston dual channel", "gabinete": "Sentey Generico", "disipador": "Intel Cooler Stock" }';
        request.post({
            headers: headers,
            url: 'http://localhost:3000/api/equipos/create',
            body: aPC,
        }, function (err, response, body) {
            expect(response.statusCode).toBe(500);
            done();
        });
    });
});