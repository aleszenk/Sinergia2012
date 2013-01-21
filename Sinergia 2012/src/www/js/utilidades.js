function calcularDistancia(lat1, long1, lat2, long2)
{
	var latitudeAndLongitudeOne = new google.maps.LatLng(
			lat1, long1);
	var latitudeAndLongitudeTwo = new google.maps.LatLng(
			lat2, long2);
	var distance = (google.maps.geometry.spherical.computeDistanceBetween(latitudeAndLongitudeOne,latitudeAndLongitudeTwo)/1000).toFixed(2);
    return distance;
}

function hayConexion(){
    
    var networkState = navigator.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.NONE] = 'No network connection';
    
    if((states[networkState] == 'No network connection') || (states[networkState] == 'Unknown connection')){
        //alert('no hay conexion');
        return false;
    }
    else{
        //alert('hay conexion');
        return true;
    }
}