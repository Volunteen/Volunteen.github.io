L.mapbox.accessToken = 'pk.eyJ1IjoiZ3NmZ2lybHN3aG9jb2RlIiwiYSI6IjA0MmYzMjVkNTRlMzc5Nzc1NjNiNDlhYTgwYjY5M2QxIn0.HB47REf6tM0lOZO8TWcl6A';
var map = L.mapbox.map('map', 'examples.map-20v6611k')
  .setView([38.12367, -76.81229], 9);

var myLayer = L.mapbox.featureLayer().addTo(map);
//var spreadsheet_url = '1B93XRI8b9NB_KiK7pSBz6C6FQeAVqRX3gebrOkNap_s';
var spreadsheet_url = '1z5IrO8EDFtBZU-f5Zi6gXgv0LFHDABFS69_H4cU8uH8';
var spreadsheet_urlResponses = '1KA9NfxB0fByKWIsXSm8jEzIiOzlhtJRcuPLWZUPSREA';

window.onload = function () {
	Tabletop.init ( {
		key: spreadsheet_url,
		key: spreadsheet_urlResponses,
		callback: showInfo,
		simpleSheet: true
	} );
};

function showInfo(data, tabletop) {
	//alert("Successfully processed!");
	//console.log(data);
	
	var places=[];
	for (var i=0; i<data.length; i++){
		var place = data[i];
		console.log(place);
		
		var placeJSON = { type: 'Feature',
						properties: {
						title: place.name,
						description: place.description,
						// image: place.image,
						'marker-color':place.color,
						'marker-size': 'large',
						'marker-symbol': place.symbol,
						},
						geometry: {
							type: 'Point',
							coordinates: [place.longitude, place.latitude]
						}
		};
		console.log(placeJSON);
		places.push(placeJSON);
	}
	setupMap(places);
}	

function setupMap(placeList){
	myLayer.setGeoJSON(placeList);
	map.fitBounds(myLayer.getBounds());
}
