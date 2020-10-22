var Equipos = require('../../models/equipo');

beforeEach(() =>{
    Equipos.allpc = [];
});

describe('Equipos.allpc', () =>{
    it('Comienza el listado de los equipos', () => {
        expect(Equipos.allpc.length).toBe(0);
    });
});

describe('Equipos.add', () =>{
    it('Agregamos un equipo', () =>{
        expect(Equipos.allpc.length).toBe(0);
        var a = new Equipos (1,'Intel Core i3 4170','EVGA 600B','Nvidia GTX 960 Strix 2GB GDDR5 128 bits OC','ASUS H81M-A LGA 1150','1 TB WD Caviar Blue 7200 RPM HDD','8GB DDR3 1333 Mhz Memox Dual Channel','Cooler Master CM 590 III Black','Cooler Master Hyper EVO 212')
        Equipos.add(a);
        expect(Equipos.allpc.length).toBe(1);
        expect(Equipos.allpc[0]).toEqual(a);
    });
});

describe('Equipos.findById', () =>{
    it('Debe devolver el equipo con id correspondiente a 1', () =>{
        expect(Equipos.allpc.length).toBe(0);
        var s = new Equipos (1,'Intel Pentium G3260','EVGA 500 W1','Nvidia GTX 1050 ASUS Dual 2GB GDDR5 128 bits OC','ASUS H81M-A LGA 1150','1 TB WD Caviar Blue 7200 RPM HDD','6GB DDR3 1333 Mhz Memox Dual Channel','Cooler Master CM 590 III Black','Intel Cooler Stock');
        var g = new Equipos (2,'Intel Pentium G3250','EVGA 500 W1','Nvidia GTX 960 Strix 2GB GDDR5 128 bits OC','ASUS H81M-A LGA 1150','1 TB WD Caviar Blue 7200 RPM HDD','6GB DDR3 1333 Mhz Memox Dual Channel','Cooler Master CM 590 III Black','Intel Cooler Stock');
        Equipos.add(s);
        Equipos.add(g);

        var targetEquipo = Equipos.findById(1);
        expect(targetEquipo.id).toBe(s.id);
        expect(targetEquipo.procesador).toBe(s.procesador);
        expect(targetEquipo.fuente).toBe(s.fuente);
        expect(targetEquipo.graphics).toBe(s.graphics);
        expect(targetEquipo.motherboard).toBe(s.motherboard);
        expect(targetEquipo.memoriaram).toBe(s.memoriaram);
        expect(targetEquipo.almacenamiento).toBe(s.almacenamiento);
        expect(targetEquipo.gabinete).toBe(s.gabinete);
        expect(targetEquipo.disipador).toBe(s.disipador);
    });
});

