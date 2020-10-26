var Equipos = require('../../models/equipo');
var request = require('request');
var server = require('../../bin/www');

var base_url = "http://localhost:3000/api/equipos";


describe('EQUIPOS API', () => {
    beforeAll(function(done) {
      mongoose.connection.close().then(() => {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true });
  
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
          console.log('We are connected to test database');
          done();
      });
    });
});

afterEach(function(done) {
    Equipos.deleteMany({}, function(err, success){
      if(err) console.log(err);
      done();
    });
  });

  describe('GET EQUIPOS /', () => {
    it('Status 200', (done) => {
      request.get(base_url, function(error, response, body){
        var result = JSON.parse(body);
        expect(response.statusCode).toBe(200);
        expect(result.equipo.length).toBe(0);
        done();
      });
    });
  });

describe('POST EQUIPOS /create', () => {
    it('STATUS 200', (done) => {
      var headers = {'content-type' : 'application/json'};
      var pc = '{"id": 2 , "procesador":"Intel Core i5 650", "fuente":"Sentey P4 600 Watts", "graphics": "Nvidia GT 740 1GB GDDR5 128 bits OC ASUS", "motherboard": "Intel DH55PJ", "almacenamiento": "Samsung HD502 500GB 7200RPM HDD", "memoriaram": "4GB DDR3 1333 Mhz Kingston dual channel", "gabinete": "Sentey Generico", "disipador": "Intel Cooler Stock" }';
      request.post({
        headers: headers,
        url: base_url + '/create',
        body: pc,
        },
        function(error, response, body) {
        expect(response.statusCode).toBe(200);
        console.log((body).pc);
        console.log(pc);
        expect(pc.procesador).toBe("Intel Core i5 650");
        expect(pc.fuente).toBe("Sentey P4 600 Watts");
        expect(pc.graphics).toBe("Nvidia GT 740 1GB GDDR5 128 bits OC ASUS");
        expect(pc.motherboard).toBe("Intel DH55PJ");
        expect(pc.almacenamiento).toBe("Samsung HD502 500GB 7200RPM HDD");
        expect(pc.memoriaram).toBe("4GB DDR3 1333 Mhz Kingston dual channel");
        expect(pc.gabinete).toBe("Sentey Generico");
        expect(pc.disipador).toBe("Intel Cooler Stock");
        done();
      });
    });
});
});
