
L.mapbox.accessToken = 'pk.eyJ1IjoiZ3NmZ2lybHN3aG9jb2RlIiwiYSI6IjA0MmYzMjVkNTRlMzc5Nzc1NjNiNDlhYTgwYjY5M2QxIn0.HB47REf6tM0lOZO8TWcl6A';
var map = L.mapbox.map('map', 'mapbox.streets')
	.setView([38.12367, -76.81229], 9);
	//.addLayer(L.mapbox.tileLayer('mapbox.streets'));
	//examples.map-20v6611k
var myLayer = L.mapbox.featureLayer().addTo(map);

var spreadsheet = '1rrsELAXKgLn6DMjNUsb721NmsRu4dqdDPAjkdPFkVnQ';

window.onload = function(){
	Tabletop.init( {
		key : spreadsheet, 
		callback : showInfo,
		simpleSheet : true
	 } );
};


function showInfo(data, tabletop) {
    alert("Successfully processed!")
    console.log(data);
    var places = [];
    for (var i = 0; i < data.length; i++){
    	var place = data[i];
    	var placeJSON = {type : 'Feature', 
    					properties : {
    						title : place.name,
    						description : place.description,
    						'marker-color' : place.color,
    						'marker-size' : 'large',
    						'marker-symbol' : place.symbol
    					} ,
    					geometry: {
    						type: 'Point',
    						coordinates : [place.longitude, place.latitude]
    						}
    					};		

    	console.log(placeJSON);		
    	places.push(placeJSON);
    }
    setUpMap(places);
    console.log(places);
}









function setUpMap(placeList){

	var markers = new L.MarkerClusterGroup({animateAddingMarkers: true, maxClusterRadius: 100, spiderfyOnMaxZoom: true, showCoverageOnHover: true, zoomToBoundsOnClick: true});


	myLayer.setGeoJSON(placeList);
	

	map.fitBounds(myLayer.getBounds());
	//map.addLayer(marker);
		//markers.addLayer(new L.marker([37.961591, -122.558033]));
	markers.addLayer(myLayer);
	map.addLayer(markers);


	markers.on('clusterclick', function (a) { setUpMap(placeList) });
	markers.on('click', function (a) { alert('Marker Clicked'); });
	markers.on('clusterclick', function (a) {a.layer.zoomToBounds(); });
	
}



//map.legendControl.addLegend(document.getElementById('legend').innerHTML);


