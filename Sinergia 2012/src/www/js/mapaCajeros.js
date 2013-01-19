var map, userPosition;
var GeoMarker;
var latitudActual, longitudActual, bounds;

var ventanaMostrarCajeros = new google.maps.InfoWindow();

function displayCajeros() {

	var mapOptions = {
		zoom : 13,
		center : new google.maps.LatLng(-34.90530797754054, -56.18638873100281),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('map_canvasCajeros'),
			mapOptions);

	GeoMarker = new GeolocationMarker();
	GeoMarker.setCircleOptions({
		fillColor : '#808080',
		radius : 10
	});

	google.maps.event.addListenerOnce(GeoMarker, 'position_changed',
			function() {
				map.setCenter(this.getPosition());
				map.fitBounds(this.getBounds());
			});

	google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
		alert('There was an error obtaining your position. Message: '
				+ e.message);
	});

	GeoMarker.setMap(map);
	$(window).resize(function() {
		google.maps.event.trigger(map, 'resize');
	});
}

function errorCajero() {
	alert('Algun error');
}
function resizeMap() {
	// calculate new size and apply it
	var mid = document.getElementById('contentMapaCajeros');
	var foot = document.getElementById('ftrMapa');

	// mid.style.height =
	// ((foot.offsetTop+foot.clientHeight)-(mid.offsetTop+mid.clientHeight))+'px';
	mid.style.height = ((foot.offsetTop) - (mid.offsetTop)) + 'px';

	// trigger a resize event on the map so it reflects the new size
	if (map != null) {
		google.maps.event.trigger(map, 'resize');
	}
}

function initCajeros() {
	displayCajeros();
}

function mostrarDetallesCajero(detallesDelCajero, mapa, marcador,idCajero) {
	var detCajero = '<div id="content">' + '<div id="sucursalInfo">' + '</div>'
			+ '<h1 id="titulo" class="titulo">Cajero</h1>'
			+ '<div id="contenido">' + '<p> ' + detallesDelCajero + '</p>'
            + '<a href=Cajero.html?id='+idCajero+'>Ficha</a>'
			+ '</div>' + '</div>';
	
	ventanaMostrarCajeros.close();
    ventanaMostrarCajeros.setContent(detCajero);
	ventanaMostrarCajeros.open(mapa, marcador);
}

function cargarMapaCajerosZona(cajerosAux) {
	var mapOptions = {
		zoom : 0,
		center : new google.maps.LatLng(0, 0),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('map_canvasCajeros'),
			mapOptions);
	agregarMarcadoresMapaCajeros(cajerosAux, map);
	$(window).resize(function() {
		google.maps.event.trigger(map, 'resize');
	});

}

function agregarMarcadoresMapaCajeros(cajerosAux, mapa1) {
	var bounds = new google.maps.LatLngBounds();
	//bounds.extend( new google.maps.LatLng(-34.894,-56.178));
	for ( var i = 0; i < cajerosAux.length; i++) {
		var latitudeAndLongitudeOne = new google.maps.LatLng(
				cajerosAux[i].Latitud, cajerosAux[i].Longitud);

		var marker1 = new google.maps.Marker({
			position : latitudeAndLongitudeOne,
			map : mapa1
		});
		bounds.extend(latitudeAndLongitudeOne);
		var detalles = "Direccion: " + cajerosAux[i].Direccion
				+ "<br/>Horario de Atencion: " + cajerosAux[i].HorarioAtencion;
        var idcajero=cajerosAux[i].id;

        insertarEventoClickCajero(marker1,detalles,mapa1,idcajero);
	}

	mapa1.fitBounds(bounds);
}

function insertarEventoClickCajero(marker,detalles,mapa,idcajero){
    
    google.maps.event.addListener(marker, 'click', function() {
                                  mostrarDetallesCajero(detalles, mapa, marker,idcajero);
                                  });
}


function agregarMarcadoresMapaCajerosDistancia(cajerosAux) {
	bounds = new google.maps.LatLngBounds();
//	bounds.extend( new google.maps.LatLng(-34.894,-56.178));

	for ( var i = 0; i < cajerosAux.length; i++) {
		var latitudeAndLongitudeOne = new google.maps.LatLng(
				cajerosAux[i].Latitud, cajerosAux[i].Longitud);

		var marker1 = new google.maps.Marker({
			position : latitudeAndLongitudeOne,
			map : map
		});
		bounds.extend(latitudeAndLongitudeOne);
		var detalles = "Direccion: " + cajerosAux[i].Direccion
				+ "<br/>Horario de Atencion: " + cajerosAux[i].HorarioAtencion;
        var idcajero=cajerosAux[i].id;

        insertarEventoClickCajero(marker1,detalles,map,idcajero);
	}
	
}

function mostrarCajero(cajero) {
	var mapOptions = {
		zoom : 13,
		center : new google.maps.LatLng(cajero.Latitud, cajero.Longitud),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_canvasCajeros'),
			mapOptions);

	var latitudeAndLongitudeOne = new google.maps.LatLng(cajero.Latitud,
			cajero.Longitud);
	var marker1 = new google.maps.Marker({
		position : latitudeAndLongitudeOne,
		map : map,
		title : "Cajero"
	});
	var detalles = "Direccion: " + cajero.Direccion
			+ "<br/>Horario de Atencion: " + cajero.HorarioAtencion;
    var idcajero=cajerosAux[i].id;
	google.maps.event.addListener(marker1, 'click', function() {
		mostrarDetallesCajero(detalles, map, marker1,idcajero);
	});
	$(window).resize(function() {
		google.maps.event.trigger(map, 'resize');
	});
}
function cargarMapaCajerosDistancia(cajerosAux) {

	var mapOptions = {
		zoom : 13,
		center : new google.maps.LatLng(-34.90530797754054, -56.18638873100281),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('map_canvasCajeros'),
			mapOptions);

	GeoMarker = new GeolocationMarker();
	GeoMarker.setCircleOptions({
		fillColor : '#808080'
	});
	
	google.maps.event.addListenerOnce(GeoMarker, 'position_changed',
			function() {
				map.setCenter(this.getPosition());
				map.fitBounds(this.getBounds());
			});

	google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
		alert('There was an error obtaining your position. Message: '
				+ e.message);
	});
	agregarMarcadoresMapaCajerosDistancia(cajerosAux, map);
	GeoMarker.setMap(map);
	bounds.extend(new google.maps.LatLng(GeoMarker.getPosition().lat(), GeoMarker.getPosition().lng()));
	map.fitBounds(bounds);
	$(window).resize(function() {
		google.maps.event.trigger(map, 'resize');
	});

}
