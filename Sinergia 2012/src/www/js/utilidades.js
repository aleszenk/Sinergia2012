function calcularDistancia(lat1, long1, lat2, long2)
{
    

    
//    var R = 6371; // km
//    var dLat = (lat2-lat1)*Math.PI/180;
//    var dLon = (long2-long1)*Math.PI/180;
//    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//    Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) *
//    Math.sin(dLon/2) * Math.sin(dLon/2);
//    var c = 2 * Math.asin(Math.sqrt(a));
//    var d = R * c;

    
    var xs = lat2 - lat1;
    xs = xs * xs;
    
    var ys = long2 - long1;
    ys = ys * ys;
    
    var d= Math.sqrt( xs + ys );
    
    alert('d: '+d);
    
    return d;
}