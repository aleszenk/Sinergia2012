function calcularDistancia(lat1, long1, lat2, long2)
{
	var latitudeAndLongitudeOne = new google.maps.LatLng(
			lat1, long1);
	var latitudeAndLongitudeTwo = new google.maps.LatLng(
			lat2, long2);
	var distance = (google.maps.geometry.spherical.computeDistanceBetween(latitudeAndLongitudeOne,latitudeAndLongitudeTwo)/1000).toFixed(2);
    return distance;
}