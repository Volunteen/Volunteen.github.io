L.mapbox.accessToken = 'pk.eyJ1IjoiZ3NmZ2lybHN3aG9jb2RlIiwiYSI6IjA0MmYzMjVkNTRlMzc5Nzc1NjNiNDlhYTgwYjY5M2QxIn0.HB47REf6tM0lOZO8TWcl6A';
var map = L.mapbox.map('map', 'examples.map-20v6611k')
  .setView([38.12367, -76.81229], 9);

var myLayer = L.mapbox.featureLayer();
var spreadsheet_url = '1H6df90hRsNrTdefLDfYjmck-viyQ0EwMyROSsUsBkvU';


window.onload = function(){
	Tabletop.init(   {  key: spreadsheet_url,
						callback: showInfo, 
						simpleSheet: true	
				  }  );
};

function showInfo(data, Tabletop) {
    
    var places = [];
    for(var i= 0; i< data.length; i++){
    	var place = data[i];
    	
    	var placeJSON = { type: 'Feature',
    					properties: {
    						title: place.name,
    						description: place.description,
    						type:place.type,
    						description: place.description + "  " + place.link + "   " + place.image,
    						'marker-color': place.color,
    						'marker-size': 'large',
    						'marker-symbol': place.symbol,
    					},
    					
    					geometry : {
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
		var markers = new L.MarkerClusterGroup({animateAddingMarkers: true, maxClusterRadius: 100, spiderfyOnMaxZoon: true, showCoverageOnHover:true, zoomToBoundsOnClick: true});
	myLayer.setGeoJSON(placeList);
	map.fitBounds(myLayer.getBounds());
	markers.addLayer(myLayer);
	map.addLayer(markers);
	
	markers.on('clusterclick', function (a) {setupMap(placeList)});
	//markers.on('click', function (a) { alert('Marker Clicked'); });
	markers.on('clusterclick', function (a) {a.layer.zoomToBounds(); });
}
