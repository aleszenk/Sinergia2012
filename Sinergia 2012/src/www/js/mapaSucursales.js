//---------------------------------------------------------------------
// Geolocation
//---------------------------------------------------------------------

<<<<<<< HEAD
var map, GeoMarker;
=======
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
>>>>>>> branch 'master' of https://github.com/aleszenk/Sinergia2012.git

<<<<<<< HEAD
var latitudActual, longitudActual;
=======
        google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
          map.setCenter(this.getPosition());
          map.fitBounds(this.getBounds());
                                          
          latitudActual=this.getPosition().lat();
          longitudActual=this.getPosition().lng();
        });
>>>>>>> branch 'master' of https://github.com/aleszenk/Sinergia2012.git

function mostrarSucursal(sucursal) {
	var mapOptions = {
		zoom : 13,
		center : new google.maps.LatLng(sucursal.Latitud, sucursal.Longitud),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

<<<<<<< HEAD
	var latitudeAndLongitudeOne = new google.maps.LatLng(sucursal.Latitud,
			sucursal.Longitud);
=======
        
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

>>>>>>> branch 'master' of https://github.com/aleszenk/Sinergia2012.git
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

	// addMarkersToMap(map);
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
<<<<<<< HEAD

	var mapOptions = {
		zoom : 13,
		center : new google.maps.LatLng(sucursalesAux[0].Latitud, sucursalesAux[0].Longitud),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

	agregarMarcadoresMapaSucursales(sucursalesAux, map);
	$(window).resize(function() {
		google.maps.event.trigger(map, 'resize');
	});

}

function agregarMarcadoresMapaSucursales(sucursalesAux, mapa1) {

	for (i = 0; i < sucursalesAux.length; i++) {
		var latitudeAndLongitudeOne = new google.maps.LatLng(
				sucursalesAux[i].Latitud, sucursalesAux[i].Longitud);

		var marker1 = new google.maps.Marker({
			position : latitudeAndLongitudeOne,
			map : mapa1
		});

		var detalles = "Direccion: " + sucursalesAux[i].Direccion
				+ "<br/>Horario de Atencion: "
				+ sucursalesAux[i].HorarioAtencion;

		google.maps.event.addListener(marker1, 'click', function() {
			mostrarDetallesSucursal(detalles, mapa1, marker1);
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

	agregarMarcadoresMapaSucursales(sucursalesAux, map);
	GeoMarker.setMap(map);
	$(window).resize(function() {
		google.maps.event.trigger(map, 'resize');

	});

}
=======
    

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
>>>>>>> branch 'master' of https://github.com/aleszenk/Sinergia2012.git
