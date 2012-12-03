//---------------------------------------------------------------------
// Geolocation
//---------------------------------------------------------------------

function getLocation() {
	var success = function(p) {
		alert('Latitude: ' + p.coords.latitude + '\n' + 'Longitude: '
				+ p.coords.longitude);
		navigator.notification.alert("position changed!", alertDismissed,
				p.coords.latitude, p.coords.latitude);
	};
	var onLocationFail = function() {
		alert('Error al detectar la posici�n');
		var initialLocation = new google.maps.LatLng('-34.90530797754054',
				'-56.18638873100281');
		createMap(initialLocation);
	};
	var options = {};
	options.enableHighAccuracy = true;
	navigator.geolocation.getCurrentPosition(display, onLocationFail, options);
}

function display(p) {
	// uso la location que da el gps
	var initialLocation = new google.maps.LatLng(p.coords.latitude,
			p.coords.longitude);
	createMap(initialLocation);
}

function createMap(initialLocation) {
	var myOptions = {
		zoom : 16,
		center : initialLocation,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"),
			myOptions);
	addMarkersToMap(map);
}


function addMarkersToMapCajeros(map){
    //aca habria que llamar algo que me devuelva las sucursales y las agrego el mapa
    //ahora pongo datos inventados
    
    //sucursal 1
    var latitudeAndLongitudeOne = new google.maps.LatLng('-34.90530797754054', '-56.189388731005');
    
    var marker1 = new google.maps.Marker({
        position: latitudeAndLongitudeOne,
        map: map,
        title: "Test"
    });
    //sucursal 2
    var latitudeAndLongitudeTwo = new google.maps.LatLng('-34.90730797754054', '-56.189388731005');
    
    var marker2 = new google.maps.Marker({
        position: latitudeAndLongitudeTwo,
        map: map
    });
    //sucursal 3
    var latitudeAndLongitude3 = new google.maps.LatLng('-34.90730797754054', '-56.187388731005');
    
    var marker3 = new google.maps.Marker({
        position: latitudeAndLongitude3,
        map: map
    });
    
    //sucursal 4
    var latitudeAndLongitude4 = new google.maps.LatLng('-34.90930797754054', '-56.187388731005');
    
    var marker4 = new google.maps.Marker({
        position: latitudeAndLongitude4,
        map: map
    });
    //sucursal 5
    var latitudeAndLongitude5 = new google.maps.LatLng('-34.90930797754054', '-56.189388731005');
    
    var marker5 = new google.maps.Marker({
        position: latitudeAndLongitude5,
        map: map
    });
    
    google.maps.event.addListener(marker1, 'click', function() {
        mostrarDetallesCajero("Detalles cajero 1",map,marker1);
    });
    google.maps.event.addListener(marker2, 'click', function() {
        mostrarDetallesCajero("Detalles cajero 2",map,marker2);
    });
    google.maps.event.addListener(marker3, 'click', function() {
        mostrarDetallesCajero("Detalles cajero 3",map,marker3);
    });
    google.maps.event.addListener(marker4, 'click', function() {
        mostrarDetallesCajero("Detalles cajero 4",map,marker4);
    });
    google.maps.event.addListener(marker5, 'click', function() {
        mostrarDetallesCajero("Detalles cajero 5",map,marker5);
    });
    
    
    //esto es para que ajuste el zoom segun los marcadores                
    
    //var mapBounds = new google.maps.LatLngBounds();
    
    //mapBounds.extend(latitudeAndLongitudeOne);
    //mapBounds.extend(latitudeAndLongitudeTwo);
    
    //map.fitBounds(mapBounds);
}

function init() {
	getLocation();
}

function mostrarDetalles(detallesDeLaSucursal, mapa, marcador) {

	var detSuc = '<div id="content">' + '<div id="sucursalInfo">' + '</div>'
			+ '<h1 id="titulo" class="titulo">Sucursal</h1>'
			+ '<div id="contenido">' + '<p><b>Sucursal</b>, '
			+ detallesDeLaSucursal + '</p>' + '</div>' + '</div>';

	var ventanaMostrar = new google.maps.InfoWindow({
		content : detSuc
	});
	ventanaMostrar.open(mapa, marcador);

}