/*function displayCajeros(){
    //lo centro en mi apto
    var initialLocation = new google.maps.LatLng('-34.90530797754054', '-56.18638873100281');
    var myOptions = {
        zoom: 16,
        center: initialLocation,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvasCajeros"), myOptions);
    
    addMarkersToMapCajeros(map);
    
}*/

var map, GeoMarker;

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
	
	addMarkersToMapCajeros(map);
	GeoMarker.setMap(map);
	$(window).resize(function() {
		google.maps.event.trigger(map, 'resize');

	});

}

function addMarkersToMapCajeros(map) {

	var mapBounds = new google.maps.LatLngBounds();
	$.getJSON('http://hp-hp/Sinergia2012/ServicioSinergia.svc/cajeros?callback=?',
					null,
					function(cajeros) {
						for (i = 0; i < cajeros.EnvioCajerosResult.length; i++) {

							var latitudeAndLongitudeOne = new google.maps.LatLng(
									cajeros.EnvioCajerosResult[i].Latitud,
									cajeros.EnvioCajerosResult[i].Longitud);
							mapBounds.extend(latitudeAndLongitudeOne);
							var marker1 = new google.maps.Marker({
								position : latitudeAndLongitudeOne,
								map : map
							});
							var detalles = "Direccion: "
									+ cajeros.EnvioCajerosResult[i].Direccion
									+ "<br/>Horario de Atencion: "
									+ cajeros.EnvioCajerosResult[i].HorarioAtencion
							/*
							 * //ciudad tiene lista de zonas
							 * cajeros.EnvioCajerosResult[i].Ciudad.Nombre;
							 * //departamento tiene lista de ciudades y ciudad
							 * tiene zonas
							 * cajeros.EnvioCajerosResult[i].Departamento.Nombre;
							 * cajeros.EnvioCajerosResult[i].Direccion;
							 * cajeros.EnvioCajerosResult[i].HorarioAtencion;
							 * cajeros.EnvioCajerosResult[i].Latitud;
							 * cajeros.EnvioCajerosResult[i].Longitud;
							 * cajeros.EnvioCajerosResult[i].PermiteDeposito;
							 * cajeros.EnvioCajerosResult[i].Zona.Nombre;
							 */

							google.maps.event.addListener(marker1, 'click',
									function() {
										mostrarDetallesCajero(detalles, map,
												marker1);
									});

						}
					});
	// esto es para que ajuste el zoom segun los marcadores
	map.fitBounds(mapBounds);
	// google.maps.event.trigger(map, 'resize');
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

function mostrarDetallesCajero(detallesDeLaSucursal, mapa, marcador) {
	var detSuc = '<div id="content">' + '<div id="sucursalInfo">' + '</div>'
			+ '<h1 id="titulo" class="titulo">Cajero</h1>'
			+ '<div id="contenido">' + '<p> ' + detallesDeLaSucursal + '</p>'
			+ '</div>' + '</div>';
	var ventanaMostrar = new google.maps.InfoWindow({
		content : detSuc
	});
	ventanaMostrar.open(mapa, marcador);
}