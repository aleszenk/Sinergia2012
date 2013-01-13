var map, GeoMarker, userPosition;

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
	/*var mapBounds = new google.maps.LatLngBounds();
	mapBounds.extend(map.center);*/
	//var cajeros = addMarkersToMapCajeros(map);
	GeoMarker.setMap(map);
	/*for (i = 0; i < cajeros.EnvioCajerosResult.length; i++) {
		var latitudeAndLongitudeOne = new google.maps.LatLng(cajeros.EnvioCajerosResult[i].Latitud,cajeros.EnvioCajerosResult[i].Longitud);
		mapBounds.extend(latitudeAndLongitudeOne);
	}
	map.fitBounds(mapBounds);*/
	$(window).resize(function() {
		google.maps.event.trigger(map, 'resize');
	});
}

function addMarkersToMapCajeros(map) {	
	var cajerosResult;
	$.getJSON('http://localhost/Sinergia2012/ServicioSinergia.svc/cajeros?callback=?',
					null,
					function(cajeros) {
					cajerosResult=cajeros;
						for (i = 0; i < cajeros.EnvioCajerosResult.length; i++) {
							var latitudeAndLongitudeOne = new google.maps.LatLng(
									cajeros.EnvioCajerosResult[i].Latitud,
									cajeros.EnvioCajerosResult[i].Longitud);
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
							//mapBounds.extend(latitudeAndLongitudeOne);
						}
					});
	// esto es para que ajuste el zoom segun los marcadores
	return cajerosResult;
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

function mostrarDetallesCajero(detallesDelCajero, mapa, marcador) {
	var detSuc = '<div id="content">' + '<div id="sucursalInfo">' + '</div>'
			+ '<h1 id="titulo" class="titulo">Cajero</h1>'
			+ '<div id="contenido">' + '<p> ' + detallesDelCajero + '</p>'
			+ '</div>' + '</div>';
	var ventanaMostrar = new google.maps.InfoWindow({
		content : detSuc
	});
	ventanaMostrar.open(mapa, marcador);
}

function cargarMapaCajerosZona(cajerosAux){
    var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(-34.90530797754054, -56.18638873100281),
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var mimapa = new google.maps.Map(document.getElementById('map_canvasCajeros'),
                                     mapOptions);
    
    GeoMarker = new GeolocationMarker();
    GeoMarker.setCircleOptions({fillColor: '#808080'});
    
    google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
                                      mimapa.setCenter(this.getPosition());
                                      mimapa.fitBounds(this.getBounds());
                                      });
    
    google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
                                  alert('There was an error obtaining your position. Message: ' + e.message);
                                  });
    
    
    agregarMarcadoresMapaSucursales(cajerosAux,mimapa);
    GeoMarker.setMap(mimapa);
    $(window).resize(function() {
                     google.maps.event.trigger(mimapa, 'resize');
                     
                     });
    
}


function agregarMarcadoresMapaCajeros(cajerosAux,mapa1){
    
    
    
    alert('cajerosAux='+cajerosAux.rows.length);
    for (i = 0; i < cajerosAux.rows.length; i++) {
        var latitudeAndLongitudeOne = new google.maps.LatLng(
                                                             cajerosAux.rows.item(i).Latitud,
                                                             cajerosAux.rows.item(i).Longitud);
        
        
        var marker1 = new google.maps.Marker({
                                             position : latitudeAndLongitudeOne,
                                             map : mapa1
                                             });
        
        var detalles = "Direccion: "
        + cajerosAux.rows.item(i).Direccion
        + "<br/>Horario de Atencion: "
        + cajerosAux.rows.item(i).HorarioAtencion;
        
        //faltan detalles
        
        
        
        google.maps.event.addListener(marker1, 'click',
                                      function() {
                                      mostrarDetallesCajero(detalles, mapa1,
                                                      marker1);
                                      });
    }
}

function cargarCajerosZona(idZona){
    traerCajerosPorZona(idZona);
}