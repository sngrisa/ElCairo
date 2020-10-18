const Equipo2 = require("../../models/Equipo2");

var mymap = L.map('main_map2').setView([-32.175784, -64.103467], 12.5);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {

attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',

}).addTo(mymap);

$.ajax({
    dataType:"json",
    url:"api/equipos",
    success= function(result){
        console.log(result);
        result.equipos.foreach(function(equipo){
            L.marker(equipo.ubicacion, {title: equipo.id}).addTo(mymap);
        });
    }
})