//---------------------------------------------------------------------
// Geolocation
//---------------------------------------------------------------------

 var map, GeoMarker;

var latitudActual,longitudActual;
 
      function display() {
		
        var mapOptions = {
          zoom: 16,
          center: new google.maps.LatLng(-34.90530797754054, -56.18638873100281),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map_canvas'),
            mapOptions);
    
        GeoMarker = new GeolocationMarker();
        GeoMarker.setCircleOptions({fillColor: '#808080'});

        google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
          map.setCenter(this.getPosition());
          map.fitBounds(this.getBounds());
                                          
          latitudActual=this.getPosition().lat();
          longitudActual=this.getPosition().lng();
        });

        google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
          alert('There was an error obtaining your position. Message: ' + e.message);
        });

        
		//addMarkersToMap(map);
		GeoMarker.setMap(map);
				$(window).resize(function() {
							google.maps.event.trigger(map, 'resize');
						
				});		

      }
function addMarkersToMap(map) {
	// aca habria que llamar algo que me devuelva las sucursales y las agrego el
	// mapa
	// ahora pongo datos inventados

	// sucursal 1
	var latitudeAndLongitudeOne = new google.maps.LatLng('-34.90530797754054',
			'-56.189388731005');

	var marker1 = new google.maps.Marker({
		position : latitudeAndLongitudeOne,
		map : map,
		title : "Sucursal 1"
	});
	// sucursal 2
	var latitudeAndLongitudeTwo = new google.maps.LatLng('-34.90730797754054',
			'-56.189388731005');

	var marker2 = new google.maps.Marker({
		position : latitudeAndLongitudeTwo,
		map : map
	});
	// sucursal 3
	var latitudeAndLongitude3 = new google.maps.LatLng('-34.90730797754054',
			'-56.187388731005');

	var marker3 = new google.maps.Marker({
		position : latitudeAndLongitude3,
		map : map
	});

	// sucursal 4
	var latitudeAndLongitude4 = new google.maps.LatLng('-34.90930797754054',
			'-56.187388731005');

	var marker4 = new google.maps.Marker({
		position : latitudeAndLongitude4,
		map : map
	});
	// sucursal 5
	var latitudeAndLongitude5 = new google.maps.LatLng('-34.90930797754054',
			'-56.189388731005');

	var marker5 = new google.maps.Marker({
		position : latitudeAndLongitude5,
		map : map
	});

	google.maps.event.addListener(marker1, 'click', function() {
		mostrarDetalles("Detalles sucursal 1", map, marker1);
	});
	google.maps.event.addListener(marker2, 'click', function() {
		mostrarDetalles("Detalles sucursal 2", map, marker2);
	});
	google.maps.event.addListener(marker3, 'click', function() {
		mostrarDetalles("Detalles sucursal 3", map, marker3);
	});
	google.maps.event.addListener(marker4, 'click', function() {
		mostrarDetalles("Detalles sucursal 4", map, marker4);
	});
	google.maps.event.addListener(marker5, 'click', function() {
		mostrarDetalles("Detalles sucursal 5", map, marker5);
	});

	// esto es para que ajuste el zoom segun los marcadores

	// var mapBounds = new google.maps.LatLngBounds();

	// mapBounds.extend(latitudeAndLongitudeOne);
	// mapBounds.extend(latitudeAndLongitudeTwo);

	// map.fitBounds(mapBounds);
}

function init() {
	display();
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

function cargarMapaSucursalesZona(sucursalesAux) {
    

    var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(-34.90530797754054, -56.18638873100281),
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var mimapa = new google.maps.Map(document.getElementById('map_canvas'),
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
    
    
    agregarMarcadoresMapaSucursales(sucursalesAux,mimapa);
    GeoMarker.setMap(mimapa);
    $(window).resize(function() {
                     google.maps.event.trigger(mimapa, 'resize');
                     
                     });		
    
}


function agregarMarcadoresMapaSucursales(sucursalesAux,mapa1){
    
  

    //alert('sucursalesAux='+sucursalesAux.rows.length);
    for (i = 0; i < sucursalesAux.rows.length; i++) {
        var latitudeAndLongitudeOne = new google.maps.LatLng(
                                                             sucursalesAux.rows.item(i).Latitud,
                                                             sucursalesAux.rows.item(i).Longitud);
        
        
        var marker1 = new google.maps.Marker({
                                             position : latitudeAndLongitudeOne,
                                             map : mapa1
                                             });

        var detalles = "Direccion: "
        + sucursalesAux.rows.item(i).Direccion
        + "<br/>Horario de Atencion: "
        + sucursalesAux.rows.item(i).HorarioAtencion;
        
        //faltan detalles
        
        
        
        google.maps.event.addListener(marker1, 'click',
                                      function() {
                                      mostrarDetalles(detalles, mapa1,
                                                            marker1);
                                      });
    }
}

function cargarMapaSucursalesDistancia(sucursalesAux) {
    
    
    var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(-34.90530797754054, -56.18638873100281),
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var mimapa = new google.maps.Map(document.getElementById('map_canvas'),
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
    
    
    agregarMarcadoresMapaSucursalesDistancia(sucursalesAux,mimapa);
    GeoMarker.setMap(mimapa);
    $(window).resize(function() {
                     google.maps.event.trigger(mimapa, 'resize');
                     
                     });
    
}

function agregarMarcadoresMapaSucursalesDistancia(sucursalesAux,mapa1){
    
    
    
    //alert('sucursalesAux='+sucursalesAux.rows.length);
    for (i = 0; i < sucursalesAux.length; i++) {
        var latitudeAndLongitudeOne = new google.maps.LatLng(
                                                             sucursalesAux[i].Latitud,
                                                             sucursalesAux[i].Longitud);
        
        
        var marker1 = new google.maps.Marker({
                                             position : latitudeAndLongitudeOne,
                                             map : mapa1
                                             });
        
        var detalles = "Direccion: "
        + sucursalesAux[i].Direccion
        + "<br/>Horario de Atencion: "
        + sucursalesAux[i].HorarioAtencion;
        
        //faltan detalles
        
        
        
        google.maps.event.addListener(marker1, 'click',
                                      function() {
                                      mostrarDetalles(detalles, mapa1,
                                                      marker1);
                                      });
    }
}



function cargarSucursalesZona(idZona){
    traerSucursalesPorZona(idZona);
}

function cargarSucursalesDistancia(distancia){
    traerSucursalesPorDistancia(distancia,latitudActual,longitudActual);
}
