L.mapbox.accessToken = 'pk.eyJ1IjoiZ3NmZ2lybHN3aG9jb2RlIiwiYSI6IjA0MmYzMjVkNTRlMzc5Nzc1NjNiNDlhYTgwYjY5M2QxIn0.HB47REf6tM0lOZO8TWcl6A';
var map = L.mapbox.map('map', 'examples.map-20v6611k')
  .setView([38.12367, -76.81229], 9);

var myLayer = L.mapbox.featureLayer().addTo(map);
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
	myLayer.setGeoJSON(placeList);
	map.fitBounds(myLayer.getBounds());
}
