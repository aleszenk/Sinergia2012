//---------------------------------------------------------------------
// Geolocation
//---------------------------------------------------------------------

var map, GeoMarker;

var latitudActual, longitudActual;

function mostrarSucursal(sucursal) {
	var mapOptions = {
		zoom : 13,
		center : new google.maps.LatLng(sucursal.Latitud, sucursal.Longitud),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

	var latitudeAndLongitudeOne = new google.maps.LatLng(sucursal.Latitud,
			sucursal.Longitud);
	var marker1 = new google.maps.Marker({
		position : latitudeAndLongitudeOne,
		map : map,
		title : "Sucursal"
	});
	var detalles = "Direccion: " + sucursal.Direccion
			+ "<br/>Horario de Atencion: " + sucursal.HorarioAtencion;

	google.maps.event.addListener(marker1, 'click', function() {
		mostrarDetallesSucursal(detalles, map, marker1);
	});
	$(window).resize(function() {
		google.maps.event.trigger(map, 'resize');
	});
}

function display() {

	var mapOptions = {
		zoom : 13,
		center : new google.maps.LatLng(-34.90530797754054, -56.18638873100281),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

	GeoMarker = new GeolocationMarker();
	GeoMarker.setCircleOptions({
		fillColor : '#808080'
	});

	google.maps.event.addListenerOnce(GeoMarker, 'position_changed',
			function() {
				map.setCenter(this.getPosition());
				map.fitBounds(this.getBounds());

				latitudActual = this.getPosition().lat();
				longitudActual = this.getPosition().lng();
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

function init() {
	display();
}

function mostrarDetallesSucursal(detallesDeLaSucursal, mapa, marcador) {

	var detSuc = '<div id="content">' + '<div id="sucursalInfo">' + '</div>'
			+ '<h1 id="titulo" class="titulo">Sucursal</h1>'
			+ '<div id="contenido">' + '<p>' + detallesDeLaSucursal + '</p>'
			+ '</div>' + '</div>';

	var ventanaMostrar = new google.maps.InfoWindow({
		content : detSuc
	});
	ventanaMostrar.open(mapa, marcador);

}

function cargarMapaSucursalesZona(sucursalesAux) {

	var mapOptions = {
		zoom : 0,
		center : new google.maps.LatLng(0, 0),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

	agregarMarcadoresMapaSucursales(sucursalesAux, map);
	$(window).resize(function() {
		google.maps.event.trigger(map, 'resize');
	});

}

function agregarMarcadoresMapaSucursales(sucursalesAux, mapa1) {
	var bounds = new google.maps.LatLngBounds();
	//bounds.extend(new google.maps.LatLng(latitudActual,longitudActual));
	for (i = 0; i < sucursalesAux.length; i++) {
		var latitudeAndLongitudeOne = new google.maps.LatLng(
				sucursalesAux[i].Latitud, sucursalesAux[i].Longitud);
	
		var marker1 = new google.maps.Marker({
			position : latitudeAndLongitudeOne,
			map : mapa1
		});
		bounds.extend(latitudeAndLongitudeOne);

		var detalles = "Direccion: " + sucursalesAux[i].Direccion
				+ "<br/>Horario de Atencion: "
				+ sucursalesAux[i].HorarioAtencion;

		google.maps.event.addListener(marker1, 'click', function() {
			mostrarDetallesSucursal(detalles, mapa1, marker1);
		});
	}
	mapa1.fitBounds(bounds);
}
function agregarMarcadoresMapaSucursalesDistancia(sucursalesAux, map) {
	var bounds = new google.maps.LatLngBounds();
	for (i = 0; i < sucursalesAux.length; i++) {
		var latitudeAndLongitudeOne = new google.maps.LatLng(
				sucursalesAux[i].Latitud, sucursalesAux[i].Longitud);
	
		var marker1 = new google.maps.Marker({
			position : latitudeAndLongitudeOne,
			map : map
		});
		bounds.extend(latitudeAndLongitudeOne);

		var detalles = "Direccion: " + sucursalesAux[i].Direccion
				+ "<br/>Horario de Atencion: "
				+ sucursalesAux[i].HorarioAtencion;

		google.maps.event.addListener(marker1, 'click', function() {
			mostrarDetallesSucursal(detalles, map, marker1);
		});
	}
}
function cargarMapaSucursalesDistancia(sucursalesAux) {

	var mapOptions = {
		zoom : 16,
		center : new google.maps.LatLng(-34.90530797754054, -56.18638873100281),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

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

	agregarMarcadoresMapaSucursalesDistancia(sucursalesAux, map);
	GeoMarker.setMap(map);
	bounds.extend(new google.maps.LatLng(GeoMarker.getPosition().lat(), GeoMarker.getPosition().lng()));
	map.fitBounds(bounds);
	$(window).resize(function() {
		google.maps.event.trigger(map, 'resize');

	});

}