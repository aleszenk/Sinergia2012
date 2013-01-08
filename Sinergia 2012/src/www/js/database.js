    var departamentos;
	var cajeros;
	var sucursales;
	var imagenes;
	var idDepartamentoSeleccionado;
	var idCiudadSeleccionada;
	var idZonaSeleccionada;
	var idSucursalSeleccionada;
	var db=window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);

	function llamarServicioDepartamentosCiudadesZonas(db){
	$.getJSON("http://192.168.1.38/Sinergia2012/ServicioSinergia.svc/Departamentos?callback=?", null,
						function(departamentosResult) {
						    departamentos = departamentosResult;							
		db.transaction(addDepartamentosCiudadesZonas, errorCB,
				successAddDepartamentosCiudadesZonas);
						});
		
	}
	
	function llamarServicioCajeros(db){
	$.getJSON("http://192.168.1.38/Sinergia2012/ServicioSinergia.svc/Cajeros?callback=?", null,
						function(cajerosResult) {
						    cajeros = cajerosResult;							
		db.transaction(addCajeros, errorCB,
				successAddCajeros);
						});
		
	}
	
	function llamarServicioSucursales(db){
		$.getJSON("http://192.168.1.38/Sinergia2012/ServicioSinergia.svc/Sucursales?callback=?", null,
							function(sucursalesResult) {
							    sucursales = sucursalesResult;							
								db.transaction(addSucursales, errorCB,
								successAddSucursales);
							});
			
		}
	
	function llamarServicioImagenes(db){
		$.getJSON("http://192.168.1.38/Sinergia2012/ServicioSinergia.svc/Imagenes?callback=?", null,
							function(imagenesResult) {
							    imagenes = imagenesResult;							
			db.transaction(addImagenes, errorCB,
					successAddImagenes);
							});
			
		}

	function addDepartamentosCiudadesZonas(tx){
		for (i = 0; i < departamentos.EnvioDepartamentosResult.length; i++) {
								var IdDpto = departamentos.EnvioDepartamentosResult[i].IdDpto;
								var NombreDpto = departamentos.EnvioDepartamentosResult[i].Nombre;
								tx.executeSql('INSERT INTO DEPARTAMENTOS (id, Nombre) VALUES ('+ IdDpto	+ ',"'+ NombreDpto+'")');
								for (j = 0; j < departamentos.EnvioDepartamentosResult[i].Ciudades.length; j++) {
									var IdCiudad = departamentos.EnvioDepartamentosResult[i].Ciudades[j].IdCiudad;
									var NombreCiudad = departamentos.EnvioDepartamentosResult[i].Ciudades[j].Nombre;
									var IdDptoCiudad = departamentos.EnvioDepartamentosResult[i].Ciudades[j].IdDpto;
									tx.executeSql('INSERT INTO CIUDADES (id, Nombre,IdDpto) VALUES ('+ IdCiudad	+ ',"'+ NombreCiudad+ '",'+ IdDptoCiudad + ')');
									if(departamentos.EnvioDepartamentosResult[i].Ciudades[j].Zonas.length !=0){
									for (h = 0; h < departamentos.EnvioDepartamentosResult[i].Ciudades[j].Zonas[h].length; h++) {
										var IdZona = departamentos.EnvioDepartamentosResult[i].Ciudades[j].Zonas[h].IdZona;
										var NombreZona = departamentos.EnvioDepartamentosResult[i].Ciudades[j].Zonas[h].Nombre;
										var IdCiudadZona = departamentos.EnvioDepartamentosResult[i].Ciudades[j].Zonas[h].IdCiudad;
										tx.executeSql('INSERT INTO ZONAS (id, Nombre,IdCiudad) VALUES ('+ IdZona+ ',"'+ NombreZona+ '",'+ IdCiudadZona + ')');
									}
								}
								else{
								//alert("la ciudad no tiene zonas");
								}
								}
							}							
	}
	

		function addCajeros(tx){
			for (i = 0; i < cajeros.EnvioCajerosResult.length; i++) {
									var IdCajero = cajeros.EnvioCajerosResult[i].IdCajero;
									var HorarioAtencion = cajeros.EnvioCajerosResult[i].HorarioAtencion;
									var Direccion = cajeros.EnvioCajerosResult[i].Direccion;
									var PermiteDeposito = cajeros.EnvioCajerosResult[i].PermiteDeposito;
									var Latitud = cajeros.EnvioCajerosResult[i].Latitud;
									var Longitud = cajeros.EnvioCajerosResult[i].Longitud;
									var IdZona = cajeros.EnvioCajerosResult[i].IdZona;
									var IdCiudad = cajeros.EnvioCajerosResult[i].IdCiudad;
									var IdDpto = cajeros.EnvioCajerosResult[i].IdDepartamento;
									tx.executeSql('INSERT INTO CAJEROS (id, HorarioAtencion,Direccion,PermiteDeposito,Latitud,Longitud,IdDepartamento,IdCiudad,IdZona) VALUES ('+ IdCajero+ ',"'+ HorarioAtencion+'","'+Direccion+'","'+PermiteDeposito+'",'+Latitud+','+Longitud+','+IdDpto+','+IdCiudad+','+IdZona+')');
									
								}
								
		}
		
		function addSucursales(tx){
			for (i = 0; i < sucursales.EnvioSucursalesResult.length; i++) {
									var IdSucursal = sucursales.EnvioSucursalesResult[i].IdSucursal;
									var HorarioAtencion = sucursales.EnvioSucursalesResult[i].HorarioAtencion;
									var Direccion = sucursales.EnvioSucursalesResult[i].Direccion;
									var TelContacto = sucursales.EnvioSucursalesResult[i].TelContacto;
									var PermiteDeposito = sucursales.EnvioSucursalesResult[i].PermiteDeposito;
									var Latitud = sucursales.EnvioSucursalesResult[i].Latitud;
									var Longitud = sucursales.EnvioSucursalesResult[i].Longitud;
									var IdZona = sucursales.EnvioSucursalesResult[i].IdZona;
									var IdCiudad = sucursales.EnvioSucursalesResult[i].IdCiudad;
									var IdDpto = sucursales.EnvioSucursalesResult[i].IdDepartamento;
									tx.executeSql('INSERT INTO SUCURSALES (id, HorarioAtencion,Direccion,TelContacto,IdZona,Latitud,Longitud,IdCiudad,IdDepartamento) VALUES ('+ IdSucursal+ ',"'+ HorarioAtencion+'","'+Direccion+'","'+TelContacto+'",'+Latitud+','+Longitud+','+IdDpto+','+IdCiudad+','+IdZona+')');
									for(j=0;j<sucursales.EnvioSucursalesResult[i].Tramites.length;j++){
									  var IdTramite = sucursales.EnvioSucursalesResult[i].Tramites[j].IdTramite;
									  var Descripcion = sucursales.EnvioSucursalesResult[i].Tramites[j].Descripcion;
									  tx.executeSql('INSERT INTO TRAMITES (id,Descripcion,IdSucursal) VALUES ('+ IdTramite+',"'+ Descripcion+'",'+IdSucursal+')');
									  
									}
									
								}
								
		}
		
		function encode(data) {
		var str = String.fromCharCode.apply(null, data);
		return btoa(str).replace(/.{76}(?=.)/g, '$&\n');
		}
		
		function addImagenes(tx){
			for (i = 0; i < imagenes.EnvioImagenesResult.length; i++) {
									var CadenaBytes = encode(imagenes.EnvioImagenesResult[i]);
									tx.executeSql('INSERT INTO IMAGENES (CadenaBytes) VALUES ("'+ CadenaBytes+'")');
									
								}
								
		}
		
		

	function successAddDepartamentosCiudadesZonas() {
		alert("Success adding depts,cities and zones");
	}
	
	function successAddCajeros() {
		alert("Success adding cajeros");
	}
	
	function successAddSucursales() {
		alert("Success adding sucursales");
	}
	
	function successAddImagenes() {
		alert("Success adding images");
	}

	function populateDB(tx) {
		database = tx;
		tx.executeSql('DROP TABLE IF EXISTS CAJEROS');
		tx.executeSql('CREATE TABLE IF NOT EXISTS CAJEROS (id unique, HorarioAtencion,Direccion,PermiteDeposito,Latitud,Longitud,IdDepartamento,IdCiudad,IdZona)');
		tx.executeSql('DROP TABLE IF EXISTS CIUDADES');
		tx.executeSql('CREATE TABLE IF NOT EXISTS CIUDADES (id unique, Nombre,IdDpto)');
		tx.executeSql('DROP TABLE IF EXISTS DEPARTAMENTOS');
		tx.executeSql('CREATE TABLE IF NOT EXISTS DEPARTAMENTOS (id unique, Nombre)');
		tx.executeSql('DROP TABLE IF EXISTS SUCURSALES');
		tx.executeSql('CREATE TABLE IF NOT EXISTS SUCURSALES (id unique, HorarioAtencion,Direccion,TelContacto,Latitud,Longitud,IdDepartamento,IdCiudad,IdZona)');
		tx.executeSql('DROP TABLE IF EXISTS TRAMITES');
		tx.executeSql('CREATE TABLE IF NOT EXISTS TRAMITES (id unique, Descripcion,IdSucursal)');
		tx.executeSql('DROP TABLE IF EXISTS ZONAS');
		tx.executeSql('CREATE TABLE IF NOT EXISTS ZONAS (id unique, Nombre,IdCiudad)');
		tx.executeSql('DROP TABLE IF EXISTS IMAGENES');
		tx.executeSql('CREATE TABLE IF NOT EXISTS IMAGENES (id INTEGER NOT NULL PRIMARY KEY, CadenaBytes)');
		
		llamarServicioDepartamentosCiudadesZonas(db);
		llamarServicioCajeros(db);
		llamarServicioSucursales(db);
		//llamarServicioImagenes(db);
	}

	function traerDepartamentos(){
		db.transaction(selectDepartamentos,errorCB,succesSelectDepartamentos)
	}


	function selectDepartamentos(tx){
        alert("entre al selectDptos");
	  tx.executeSql('SELECT * FROM DEPARTAMENTOS',
				[], querySuccessSelectDepartamentos, errorCB);
	}
	
	function querySuccessSelectDepartamentos(tx, results) {
        alert("query success");
		var len = results.rows.length;
		alert("Departamentos: " + len);
		for ( var i = 0; i < len; i++) {
			alert("Nombre =  " + results.rows.item(i).Nombre);
		}
		 
	}

	function succesSelectDepartamentos(){
	  alert("Funciono el select de departamentos");
	}
	
	function traerCajeros(){
		db.transaction(selectCajeros,errorCB,succesSelectCajeros)
	}
	
	function selectCajeros(tx){
	  tx.executeSql('SELECT * FROM CAJEROS',
				[], querySuccessSelectCajeros, errorCB);
	}
	
	function querySuccessSelectCajeros(tx, results) {
		var len = results.rows.length;
		alert("Cajeros: " + len);
		for ( var i = 0; i < len; i++) {
			alert("Nombre =  " + results.rows.item(i).Direccion);
		}
		 
	}

	function succesSelectCajeros(){
	  alert("Funciono el select de cajeros");
	}
	
	function traerSucursales(){
		db.transaction(selectSucursales,errorCB,succesSelectSucursales)
	}
	
	function selectSucursales(tx){
	  tx.executeSql('SELECT * FROM SUCURSALES',
				[], querySuccessSelectSucursales, errorCB);
	}
	
	function querySuccessSelectSucursales(tx, results) {
		var len = results.rows.length;
		alert("Sucursales: " + len);
		for ( var i = 0; i < len; i++) {
			alert("Nombre =  " + results.rows.item(i).Direccion);
		}
		 
	}

	function succesSelectSucursales(){
	  alert("Funciono el select de sucursales");
	}

	function errorCB(err) {
		alert("Error processing SQL: " + err.code + " "+err.message);
	}

	function successCB() {
		alert("Se creo la BD");
	}
	
	function ciudadesPorDepartamento(idDpto){
		idDepartamentoSeleccionado=idDpto;
		db.transaction(selectCiudadesDepartamento,errorCB,succesSelectCiudadesDepartamentos)
	}
	
	function selectCiudadesDepartamento(tx){
	  tx.executeSql('SELECT * FROM CIUDADES WHERE idDpto='+idDepartamentoSeleccionado,
				[], querySuccessSelectCiudadesDepartamento, errorCB);
	}
	
	function querySuccessSelectCiudadesDepartamento(tx, results) {
		var len = results.rows.length;
		alert("Ciudades encontradas: " + len);
		for ( var i = 0; i < len; i++) {
			alert("Nombre =  " + results.rows.item(i).Nombre);
		}
		 
	}

	function succesSelectCiudadesDepartamentos(){
	  alert("Funciono el select de ciudades por departamento");
	}
	
	function zonasPorCiudad(idCiudad){
		idCiudadSeleccionada=idCiudad;
		db.transaction(selectZonasCiudad,errorCB,succesSelectZonasCiudad)
	}
	
	function selectZonasCiudad(tx){
	  tx.executeSql('SELECT * FROM ZONAS WHERE idCiudad='+idCiudadSeleccionada,
				[], querySuccessSelectZonasCiudad, errorCB);
	}
	
	function querySuccessSelectZonasCiudad(tx, results) {
		var len = results.rows.length;
		alert("Zonas encontradas: " + len);
		for ( var i = 0; i < len; i++) {
			alert("Nombre =  " + results.rows.item(i).Nombre);
		}
		 
	}

	function succesSelectZonasCiudad(){
	  alert("Funciono el select de zonas por ciudad");
	}
	
	function sucursalesPorZona(idZona){
		idZonaSeleccionada=idZona;
		db.transaction(selectSucursalesZona,errorCB,succesSelectSucursalesZona)	
	}
	
	function selectSucursalesZona(tx){
	  tx.executeSql('SELECT * FROM SUCURSALES WHERE idZona='+idZonaSeleccionada,
				[], querySuccessSelectSucursalesZona, errorCB);
	}
	
	function querySuccessSelectSucursalesZona(tx, results) {
		var len = results.rows.length;
		alert("Sucursales encontradas: " + len);
		for ( var i = 0; i < len; i++) {
			alert("Direccion =  " + results.rows.item(i).Direccion);
		}
		 
	}

	function succesSelectZonasCiudad(){
	  alert("Funciono el select de sucursales por zona");
	}
	
	function cajerosPorZona(idZona){
		idZonaSeleccionada=idZona;
		db.transaction(selectCajerosZona,errorCB,succesSelectCajerosZona)	
	}
	
	function selectCajerosZona(tx){
	  tx.executeSql('SELECT * FROM CAJEROS WHERE idZona='+idZonaSeleccionada,
				[], querySuccessSelectCajerosZona, errorCB);
	}
	
	function querySuccessSelectCajerosZona(tx, results) {
		var len = results.rows.length;
		alert("Cajeros encontrados: " + len);
		for ( var i = 0; i < len; i++) {
			alert("Direccion =  " + results.rows.item(i).Direccion);
		}
		 
	}

	function succesSelectCajerosZona(){
	  alert("Funciono el select de cajeros por zona");
	}
	
	function tramitesSucursal(idSucursal){
		idSucursalSeleccionada=idSucursal;
		db.transaction(selectTramitesSucursal,errorCB,succesSelectTramitesSucursal)
	
	}
	
	function selectTramitesSucursal(tx){
	  tx.executeSql('SELECT * FROM TRAMITES WHERE idSucursal='+idSucursalSeleccionada,
				[], querySuccessSelectTramitesSucursal, errorCB);
	}
	
	function querySuccessSelectTramitesSucursal(tx, results) {
		var len = results.rows.length;
		alert("Tramites de la surcursal: " + len);
		for ( var i = 0; i < len; i++) {
			alert("Nombre =  " + results.rows.item(i).Descripcion);
		}
		 
	}
	
	function succesSelectTramitesSucursal(){
	  alert("Funciono el select de los tramites");
	}

	

	function onDeviceReady() {
		db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
		db.transaction(populateDB, errorCB, successCB);
	}
	
	function addListener() {
		document.addEventListener("deviceready", onDeviceReady, false);
	}