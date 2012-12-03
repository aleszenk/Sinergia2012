function display(){
    //lo centro en mi apto
    var initialLocation = new google.maps.LatLng('-34.90530797754054', '-56.18638873100281');
    var myOptions = {
        zoom: 16,
        center: initialLocation,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    
    addMarkersToMap(map);
    
}

function addMarkersToMap(map){
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
        mostrarDetalles("Detalles sucursal 1",map,marker1);
    });
    google.maps.event.addListener(marker2, 'click', function() {
        mostrarDetalles("Detalles sucursal 2",map,marker2);
    });
    google.maps.event.addListener(marker3, 'click', function() {
        mostrarDetalles("Detalles sucursal 3",map,marker3);
    });
    google.maps.event.addListener(marker4, 'click', function() {
        mostrarDetalles("Detalles sucursal 4",map,marker4);
    });
    google.maps.event.addListener(marker5, 'click', function() {
        mostrarDetalles("Detalles sucursal 5",map,marker5);
    });
    
    
    //esto es para que ajuste el zoom segun los marcadores                
    
    //var mapBounds = new google.maps.LatLngBounds();
    
    //mapBounds.extend(latitudeAndLongitudeOne);
    //mapBounds.extend(latitudeAndLongitudeTwo);
    
    //map.fitBounds(mapBounds);
}


function error(){
    alert('Algun error');
}

function init(){
    //navigator.geolocation.getCurrentPosition(display,error);
    display();
    //function onDeviceReady(){
    //  var map = new GoogleMap();
    // map.initialize();
    //}
}

function mostrarDetalles(detallesDeLaSucursal,mapa, marcador){
    
    var detSuc= '<div id="content">'+
    '<div id="sucursalInfo">'+
    '</div>'+
    '<h1 id="titulo" class="titulo">Sucursal</h1>'+
    '<div id="contenido">'+
    '<p><b>Sucursal</b>, '+detallesDeLaSucursal + '</p>'+
    '</div>'+
    '</div>';
    
    var ventanaMostrar=new google.maps.InfoWindow({
        content: detSuc
    });
    ventanaMostrar.open(mapa,marcador);
    
    
}