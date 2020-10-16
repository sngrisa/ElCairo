var mymap = L.map('main_map').setView([-32.175784, -64.103467], 12.5);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {

attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',

}).addTo(mymap);

L.marker([-32.175827, -64.103455]).addTo(mymap);
L.marker([-32.166875, -64.111905]).addTo(mymap);
L.marker([-32.167753, -64.122024]).addTo(mymap);
