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
          zoom: 16,
          center: new google.maps.LatLng(-34.90530797754054, -56.18638873100281),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map_canvasCajeros'),
            mapOptions);
    
        GeoMarker = new GeolocationMarker();
        GeoMarker.setCircleOptions({fillColor: '#808080'});

        google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
          map.setCenter(this.getPosition());
          map.fitBounds(this.getBounds());
        });

        google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
          alert('There was an error obtaining your position. Message: ' + e.message);
        });

        
		addMarkersToMapCajeros(map);
		GeoMarker.setMap(map);
				$(window).resize(function() {
							google.maps.event.trigger(map, 'resize');
						
				});		
		
		
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


function errorCajero(){
    alert('Algun error');
}
function resizeMap() {
				  // calculate new size and apply it
				  var mid = document.getElementById('contentMapaCajeros');
				  var foot = document.getElementById('ftrMapa');
				 
				  //mid.style.height = ((foot.offsetTop+foot.clientHeight)-(mid.offsetTop+mid.clientHeight))+'px';
				  mid.style.height = ((foot.offsetTop) - (mid.offsetTop))+'px';
				 
				  // trigger a resize event on the map so it reflects the new size
				  if(map != null) {
					google.maps.event.trigger(map, 'resize');
				  }
				}
				
function initCajeros(){
    displayCajeros();
	 //resize the map container
					//resizeMap();
					// bind resize map function to the resize event for the window
				// $(window).resize(function() {
					//resizeMap();
				  //});

}

function mostrarDetallesCajero(detallesDeLaSucursal,mapa, marcador){
    
    var detSuc= '<div id="content">'+
    '<div id="sucursalInfo">'+
    '</div>'+
    '<h1 id="titulo" class="titulo">Cajero</h1>'+
    '<div id="contenido">'+
    '<p><b>Cajero</b>, '+detallesDeLaSucursal + '</p>'+
    '</div>'+
    '</div>';
    
    var ventanaMostrar=new google.maps.InfoWindow({
        content: detSuc
    });
    ventanaMostrar.open(mapa,marcador);
    
    
}