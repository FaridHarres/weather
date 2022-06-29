console.log("hello")

//creation de la map
var map = L.map('worldmap').setView([48.866667, 2.333333], 4);

//initialisation du calque images
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

//ajout d'un marqueur

var cities = document.getElementsByClassName('list-group-item');
for(let i =0; i<cities.length; i++) {
 var lon = cities[i].dataset.long;
 var lat = cities[i].dataset.lat;
 var names = cities[i].dataset.name


 
var customIcon = L.icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
    shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
    iconSize:     [30, 90], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
L.marker([lat, lon], {icon: customIcon}).bindPopup(names).addTo(map);


}
