    var departamentos;
	var cajeros;
	var sucursales;
	var imagenes;
	var idDptoSeleccionado;
	var idCiudadSeleccionada;
	var idZonaSeleccionada;
	var idCajeroSeleccionado;
	var idSucursalSeleccionado;
	var db;	
	var opcionElegida="cajero";

	function llamarServicioDepartamentosCiudadesZonas(db){
		$.getJSON("http://192.168.1.34/Sinergia2012/ServicioSinergia.svc/Departamentos?callback=?", null,
		function(departamentosResult) {
			departamentos = departamentosResult;							
			db.transaction(addDepartamentosCiudadesZonas, errorCB, successAddDepartamentosCiudadesZonas);
		});		
	}
	
	function llamarServicioCajeros(db){
		$.getJSON("http://192.168.1.34/Sinergia2012/ServicioSinergia.svc/Cajeros?callback=?", null,
		function(cajerosResult) {
			cajeros = cajerosResult;							
			db.transaction(addCajeros, errorCB, successAddCajeros);
		});		
	}
	
	function llamarServicioSucursales(db){
		$.getJSON("http://192.168.1.34/Sinergia2012/ServicioSinergia.svc/Sucursales?callback=?", null,
		function(sucursalesResult) {
			sucursales = sucursalesResult;							
			db.transaction(addSucursales, errorCB, successAddSucursales);
		});			
	}
	
	function llamarServicioImagenes(db){
		$.getJSON("http://192.168.1.34/Sinergia2012/ServicioSinergia.svc/Imagenes?callback=?", null,
		function(imagenesResult) {
			imagenes = imagenesResult;							
			db.transaction(addImagenes, errorCB, successAddImagenes);
		});			
	}

	function addDepartamentosCiudadesZonas(tx)
	{
		for (i = 0; i < departamentos.EnvioDepartamentosResult.length; i++)
		{
			var IdDpto = departamentos.EnvioDepartamentosResult[i].IdDpto;
			var NombreDpto = departamentos.EnvioDepartamentosResult[i].Nombre;
			tx.executeSql('INSERT INTO DEPARTAMENTOS (id, Nombre) VALUES ('+ IdDpto	+ ',"'+ NombreDpto+'")');
			for (j = 0; j < departamentos.EnvioDepartamentosResult[i].Ciudades.length; j++)
			{
				var IdCiudad = departamentos.EnvioDepartamentosResult[i].Ciudades[j].IdCiudad;
				var NombreCiudad = departamentos.EnvioDepartamentosResult[i].Ciudades[j].Nombre;
				var IdDptoCiudad = departamentos.EnvioDepartamentosResult[i].Ciudades[j].IdDpto;
				tx.executeSql('INSERT INTO CIUDADES (id, Nombre,IdDpto) VALUES ('+ IdCiudad	+ ',"'+ NombreCiudad+ '",'+ IdDptoCiudad + ')');				
				if(departamentos.EnvioDepartamentosResult[i].Ciudades[j].Zonas.length!=0)
				{
					var zonas = departamentos.EnvioDepartamentosResult[i].Ciudades[j].Zonas;
					
					for (h = 0; h < zonas.length; h++)
					{
						var IdZona = departamentos.EnvioDepartamentosResult[i].Ciudades[j].Zonas[h].IdZona;
						var NombreZona = departamentos.EnvioDepartamentosResult[i].Ciudades[j].Zonas[h].Nombre;
						var IdCiudadZona = departamentos.EnvioDepartamentosResult[i].Ciudades[j].Zonas[h].IdCiudad;
						tx.executeSql('INSERT INTO ZONAS (id, Nombre,IdCiudad) VALUES ('+ IdZona+ ',"'+ NombreZona+ '",'+ IdCiudadZona + ')');
					}
				}
				else
				{
					//alert("la ciudad no tiene zonas");
				}
			}
		}							
	}
	
	function addCajeros(tx)
	{
		for (i = 0; i < cajeros.EnvioCajerosResult.length; i++)
		{
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
		
	function addSucursales(tx)
	{
		for (i = 0; i < sucursales.EnvioSucursalesResult.length; i++)
		{
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
			tx.executeSql('INSERT INTO SUCURSALES (id, HorarioAtencion,Direccion,TelContacto,IdZona,Latitud,Longitud,IdCiudad,IdDepartamento) VALUES ('+ IdSucursal+ ',"'+ HorarioAtencion+'","'+Direccion+'","'+TelContacto+'",'+IdZona+','+Latitud+','+Longitud+','+IdCiudad+','+IdDpto+')');
			for(j=0;j<sucursales.EnvioSucursalesResult[i].Tramites.length;j++)
			{
				var IdTramite = sucursales.EnvioSucursalesResult[i].Tramites[j].Tramite.IdTramite;
				var Descripcion = sucursales.EnvioSucursalesResult[i].Tramites[j].Tramite.Descripcion;
				tx.executeSql('INSERT INTO TRAMITES (id,Descripcion,IdSucursal) VALUES ('+ IdTramite+',"'+ Descripcion+'",'+IdSucursal+')');				  
			}				
		}								
	}
		
	function encode(data)
	{
		var str = String.fromCharCode.apply(null, data);
		return btoa(str).replace(/.{76}(?=.)/g, '$&\n');
	}
	
	function addImagenes(tx)
	{
		for (i = 0; i < imagenes.EnvioImagenesResult.length; i++)
		{
			var CadenaBytes = encode(imagenes.EnvioImagenesResult[i]);
			tx.executeSql('INSERT INTO IMAGENES (CadenaBytes) VALUES ("' + CadenaBytes + '")');			
		}							
	}		

	function successAddDepartamentosCiudadesZonas()
	{
		//alert("Success adding depts,cities and zones");
	}
	
	function successAddCajeros()
	{
		//alert("Success adding cajeros");
	}
	
	function successAddSucursales()
	{
		//alert("Success adding sucursales");
	}
	
	function selectImagenes(tx){
	  tx.executeSql('SELECT * FROM IMAGENES',
				[], querySuccessSelectImagenes, errorCB);
	}
	
	
		/*se llama al servicio para cargar las imagenes y a partir de ahi se crea el carrousel
		si no hay imagenes en base ni conexion entonces no se muestra el carrousel.
		IMPORTANTE: hay que probar bien el metodo de conversion de byte array a imagenes en todos los SO 
		ya que al parecer versiones viejas de exploradores no soportan como src de la imagen data:image.......*/
	function querySuccessSelectImagenes(tx, results) {
		var len = results.rows.length;		
		for ( var i = 0; i < len; i++) {
								$(".carrousel")
										.find("ul")
										.append(
												'<li><img src="data:image/jpg;base64,'
														+ results.rows.item(i).CadenaBytes
														+ '" width="64" height="64"></li>');
		}
		if(len!=0){
			$(".carrousel").jMyCarousel({
				visible : '100%',
				auto : true,
				speed : 3000
			});
		}
	}
	
	function successAddImagenes() {
		//alert("Success adding images");
		db.transaction(selectImagenes,errorCB,succesSelectImagenes);
	}
	
	function succesSelectImagenes(){
	  //alert("Funciono el select de departamentos");
	}
	
	function populateDB(tx)
	{
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
		llamarServicioImagenes(db);
	}

	function traerDepartamentos()
	{
		db.transaction(selectDepartamentos, errorCB, succesSelectDepartamentos)
	}

	function selectDepartamentos(tx)
	{
      //alert("entre al selectDptos");
	  tx.executeSql('SELECT * FROM DEPARTAMENTOS', [], querySuccessSelectDepartamentos, errorCB);
	}
	
	function querySuccessSelectDepartamentos(tx, results)
	{
		cargarListaCheck(results);
	}

	function cargarListaCheck(results)
	{
        
		//obtengo el tag div donde van a ir los dptos o ciudades o zonas
		var div = document.getElementById("contenedor");
        
		$(div).empty();
        //recorro los dptos o ciudades o zonas
		for(var i=0;i<results.rows.length;i++){
			//creo los tags a utilizar
			var newDiv = document.createElement('div');        
			var inputDiv = document.createElement('input');
			var lblDiv = document.createElement('label');
			var spanlbl = document.createElement('span');
			var spanSpan = document.createElement('span');			
			var spanSpanSpan = document.createElement('span');
			var spanSpanSpanSpan = document.createElement('span');
			var spanSpan2 = document.createElement('span');
			
			//agrego propiedades a los tags
			//newDiv propiedades
			newDiv.setAttribute('class', 'ui-radio');
			//inputDiv propiedades
			inputDiv.setAttribute('type', 'radio');			
			inputDiv.setAttribute('value', 'choice-' + results.rows.item(i).id);
			inputDiv.setAttribute('id', 'radio-choice-' + results.rows.item(i).id + '-a');
			inputDiv.setAttribute('name', 'radio-choice-a');	
			//lblDiv propiedades			
			lblDiv.setAttribute('id', 'lblID' + results.rows.item(i).id);
			lblDiv.setAttribute('class', 'ui-corner-none ui-btn ui-btn-icon-left ui-btn-up-a ui-btn-corner-all ui-radio-off ui-btn-up-c');
			lblDiv.setAttribute('data-form', 'ui-btn-up-a');
			lblDiv.setAttribute('for', 'radio-choice-' + results.rows.item(i).id + '-a');
			lblDiv.setAttribute('data-corners', 'true');
			lblDiv.setAttribute('data-shadow', 'false');
			lblDiv.setAttribute('data-iconshadow', 'true');
			lblDiv.setAttribute('data-wrapperels', 'span');
			lblDiv.setAttribute('data-icon', 'radio-off');
			lblDiv.setAttribute('data-theme', 'c');
			//spanlbl propiedades
			spanlbl.setAttribute('class', 'ui-btn-inner ui-btn-corner-all');
			//spanSpan propiedades
			spanSpan.setAttribute('class', 'ui-btn-text');			
			//spanSpan2 propiedades
			spanSpan2.setAttribute('class', 'ui-icon ui-icon-radio-off ui-icon-shadow');
			spanSpan2.setAttribute('id','spanID' + results.rows.item(i).id);
			//spanSpanSpan propiedades
			spanSpanSpan.setAttribute('class', 'ui-btn-inner');
			//spanSpanSpanSpan propiedades t le doy el valor del dpto o ciudad o zona (nombre)
			spanSpanSpanSpan.setAttribute('class', 'ui-btn-text');
			spanSpanSpanSpan.innerHTML = results.rows.item(i).Nombre;
			       
			//los agrego al div
			newDiv.appendChild(inputDiv);
			newDiv.appendChild(lblDiv);
			lblDiv.appendChild(spanlbl);
			spanlbl.appendChild(spanSpan);			
			spanSpan.appendChild(spanSpanSpan);
			spanSpanSpan.appendChild(spanSpanSpanSpan);
			spanlbl.appendChild(spanSpan2);			
			div.appendChild(newDiv);
			
			clickCheckbox(results.rows.item(i).id, results);
		}		
	}
	
	//metodo q se encarga de tomar las propiedades y editarlas 
	//dependiendo de si on clickeadas o no, si una ya fue clickeada, etc.
	function clickCheckbox(id, lista)
	{
		//dado el id, tomo los tags a cambiar propiedades
		var input = document.getElementById('radio-choice-' + id + '-a');
		var lbl = document.getElementById('lblID' + id);
		var span = document.getElementById('spanID' + id);
		var hiddenInput = document.getElementById('selectedID');
		//cuando el usuario hace click, evaluo
		input.onclick = function() 
						{
							//recorro todos los dptos o ciudades o zonas viendo si alguno ya tiene click,
							//si no, hago click, si otro tiene click, cambio el click
							for(var i=0;i<lista.rows.length;i++)
							{
								if(lista.rows.item(i).id != id)
								{
									//tags a los q hay q sacarle las props xa q c vaya el click
									var inputAux = document.getElementById('radio-choice-'+ lista.rows.item(i).id + '-a');
									var lblAux = document.getElementById('lblID' + lista.rows.item(i).id);
									var spanAux = document.getElementById('spanID'+ lista.rows.item(i).id);
									
									var propiedadClass = lblAux.getAttribute('class');
									if(propiedadClass == 'ui-corner-none ui-btn ui-btn-icon-left ui-btn-up-a ui-btn-corner-all ui-radio-on ui-btn-up-c')
									{
										//saco propiedades xa check
										inputAux.setAttribute('checked', ''); 
										lblAux.setAttribute('class', 'ui-corner-none ui-btn ui-btn-icon-left ui-btn-up-a ui-btn-corner-all ui-radio-off ui-btn-up-c');
										spanAux.setAttribute('class', 'ui-icon ui-icon-radio-off ui-icon-shadow');
										
										//agrego check
										input.setAttribute('checked', 'checked'); 
										lbl.setAttribute('class', 'ui-corner-none ui-btn ui-btn-icon-left ui-btn-up-a ui-btn-corner-all ui-radio-on ui-btn-up-c');
										span.setAttribute('class', 'ui-icon ui-icon-radio-on ui-icon-shadow');
										hiddenInput.setAttribute('value', id+"="+opcionElegida);
									}									
								}
								else
								{
									//agrego check
									input.setAttribute('checked', 'checked'); 
									lbl.setAttribute('class', 'ui-corner-none ui-btn ui-btn-icon-left ui-btn-up-a ui-btn-corner-all ui-radio-on ui-btn-up-c');
									span.setAttribute('class', 'ui-icon ui-icon-radio-on ui-icon-shadow');
									hiddenInput.setAttribute('value', id+"="+opcionElegida);
								}
							}
						};		
	}
	
	function succesSelectDepartamentos()
	{
		//alert("Funciono el select de departamentos");
	}

	function traerCajeroID(idCajero)
	{
		idCajeroSeleccionado = idCajero;
		db.transaction(selectCajero, errorCB, successSelectCajero)
	}
	
	function selectCajero(tx)
	{
		tx.executeSql('SELECT * FROM CAJEROS WHERE id = ' + idCajeroSeleccionado, [], querySuccessSelectCajero, errorCB);
	}
	
	function successSelectCajero()
	{
		//alert("Funciono el select de cajero");
	}
	
	function querySuccessSelectCajero(tx, result)
	{
		vistaCajero(result);
	}	
	
	function vistaCajero(result)
	{
		//tomo los labels donde colocar la data del cajero
		var lblHorario = document.getElementById('lblHorario');
		var lblDireccion = document.getElementById('lblDireccion');
		
		//agrego los valores
		lblHorario.innerHTML = result.rows.item(0).HorarioAtencion;
		lblDireccion.innerHTML = result.rows.item(0).Direccion;
	}

function traerSucursalesPorZona(idZona){
    
     db.transaction(function(tx) {
                //tx.executeSql('SELECT * FROM SUCURSALES WHERE IdZona=?', [idZona], function(tx,results){
                   tx.executeSql('SELECT * FROM SUCURSALES WHERE IdZona='+idZona, [], function(tx,results){
                  // tx.executeSql('SELECT * FROM SUCURSALES', [], function(tx,results){
                                 
                                 cargarMapaSucursalesZona(results);
                                 });
                   
                   });
    
    
}

function traerCajerosPorZona(idZona){
    db.transaction(function(tx) {
                   
                   tx.executeSql('SELECT * FROM CAJEROS WHERE IdZona='+idZona, [], function(tx,results){
                                 // tx.executeSql('SELECT * FROM CAJEROS', [], function(tx,results){
                                 
                                 cargarMapaCajerosZona(results);
                                 });
                   
                   });
}

	function traerSucursalID(idSucursal)
	{
        
		idSucursalSeleccionado = idSucursal;
		db.transaction(selectSucursal, errorCB, successSelectSucursal);
        
	}
	
	function selectSucursal(tx)
	{
		tx.executeSql('SELECT * FROM SUCURSALES WHERE id = ' + idSucursalSeleccionado, [], querySuccessSelectSucursal, errorCB);
	}
	
	function successSelectSucursal()
	{
		//alert("Funciono el select de cajero");
	}

	function querySuccessSelectSucursal(tx, result)
	{
		vistaSucursal(result);
	}	
	
	function vistaSucursal(result)
	{
		//tomo los labels donde colocar la data del cajero
		var lblHorario = document.getElementById('lblHorario');
		var lblDireccion = document.getElementById('lblDireccion');
		var lblTelefono = document.getElementById('lblTelefono');
		var lblTramites = document.getElementById('lblTramites');
		
		//agrego los valores
		lblHorario.innerHTML = result.rows.item(0).HorarioAtencion;
		lblDireccion.innerHTML = result.rows.item(0).Direccion;
		$("#tel").attr("href","tel:"+ result.rows.item(0).TelContacto);
		$("#tel").text(result.rows.item(0).TelContacto);
		tramitesSucursal(idSucursalSeleccionado);
	}
	
	function traerCajeros()
	{
		db.transaction(selectCajeros, errorCB, succesSelectCajeros)
	}
	
	function selectCajeros(tx)
	{
		tx.executeSql('SELECT * FROM CAJEROS', [], querySuccessSelectCajeros, errorCB);
	}
	
	function querySuccessSelectCajeros(tx, results)
	{
        cargarLista(results,true);		 
	}

	function cargarLista(results,isCajeros)
	{
		//obtengo el tag ul donde van a ir los cajeros
		if(isCajeros){
			var ul=document.getElementById("ulCajeros");  
		}else{
			var ul=document.getElementById("ulSucursales");  
		}
		$(ul).empty();
		//recorro los cajeros
		for(var i=0;i<results.rows.length;i++)
		{
			//creo los tags a utilizar
			var newLi=document.createElement('li');        
			var divLi=document.createElement('div');
			var divA=document.createElement('div');
			var newA=document.createElement('a');
			var spanDivLi=document.createElement('span');
			//agrego propiedades a los tags
			//newLi propiedades
			newLi.setAttribute('data-theme', 'a');
			newLi.setAttribute('class', 'ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-last ui-btn-up-a');
			newLi.setAttribute('data-corners', 'false');
			newLi.setAttribute('data-shadow', 'false');
			newLi.setAttribute('data-iconshadow', 'true');
			newLi.setAttribute('data-wrapperels', 'div');
			newLi.setAttribute('data-icon', 'arrow-r');
			newLi.setAttribute('data-iconpos', 'right');
			//newLi propiedades y le doy el href conjunto con el id del cajero xa traerlo en la sig vista
			if(isCajeros){
				newA.setAttribute('href','Cajero.html?id=' + results.rows.item(i).id);
			}else{
			    newA.setAttribute('href','Sucursal.html?id=' + results.rows.item(i).id);
			}
			newA.setAttribute('data-transition', 'slide');
			newA.setAttribute('class', 'ui-link-inherit'); 
			//divLi propiedades
			divLi.setAttribute('class', 'ui-btn-inner ui-li');
			//divA propiedades
			divA.setAttribute('class', 'ui-btn-text');
			//spanDivLi propiedades
			spanDivLi.setAttribute('class', 'ui-icon ui-icon-arrow-r ui-icon-shadow');
			
			//los agrego al ul
			newA.appendChild(document.createTextNode(results.rows.item(i).Direccion));
			newLi.appendChild(divLi);
			divLi.appendChild(divA);
			divLi.appendChild(spanDivLi);
			divA.appendChild(newA);
			ul.appendChild(newLi);
		}
	}

	function succesSelectCajeros()
	{
		//alert("Funciono el select de cajeros");
	}
	
	function traerSucursales()
	{
		db.transaction(selectSucursales, errorCB, succesSelectSucursales)
	}
	
	function selectSucursales(tx)
	{
	  tx.executeSql('SELECT * FROM SUCURSALES', [], querySuccessSelectSucursales, errorCB);
	}
	
	function querySuccessSelectSucursales(tx, results)
	{
        cargarLista(results,false);
	}

	function succesSelectSucursales()
	{
		//alert("Funciono el select de sucursales");
	}

	function errorCB(err)
	{
		//alert("Error processing SQL: " + err.code + " " + err.message);
	}

	function successCB()
	{
		//alert("Se creo la BD");
	}
	
	function ciudadesPorDepartamento(idDpto)
	{
		idDptoSeleccionado = idDpto;
		db.transaction(selectCiudadesDepartamento, errorCB, succesSelectCiudadesDepartamentos)
	}
	
	function selectCiudadesDepartamento(tx)
	{
		tx.executeSql('SELECT * FROM CIUDADES WHERE idDpto =' + idDptoSeleccionado, [], querySuccessSelectCiudadesDepartamento, errorCB);
	}
	
	function querySuccessSelectCiudadesDepartamento(tx, results)
	{
		cargarListaCheck(results,"cajero");		 
	}

	function succesSelectCiudadesDepartamentos()
	{
		//alert("Funciono el select de ciudades por departamento");
	}
	
	function zonasPorCiudad(idCiudad,opcion)
	{
		opcionElegida = opcion;
		idCiudadSeleccionada = idCiudad;
		db.transaction(selectZonasCiudad, errorCB, succesSelectZonasCiudad)
	}
	
	function selectZonasCiudad(tx)
	{
		tx.executeSql('SELECT * FROM ZONAS WHERE IdCiudad =' + idCiudadSeleccionada, [], querySuccessSelectZonasCiudad, errorCB);
	}
	
	function querySuccessSelectZonasCiudad(tx, results)
	{
		cargarListaCheck(results);		 
	}

	function succesSelectZonasCiudad()
	{
	  //alert("Funciono el select de zonas por ciudad");
	}
	
	function sucursalesPorZona(idZona)
	{
		idZonaSeleccionada = idZona;
		db.transaction(selectSucursalesZona, errorCB, succesSelectSucursalesZona)	
	}
	
	function selectSucursalesZona(tx)
	{
	  tx.executeSql('SELECT * FROM SUCURSALES WHERE idZona =' + idZonaSeleccionada, [], querySuccessSelectSucursalesZona, errorCB);
	}
	
	function querySuccessSelectSucursalesZona(tx, results)
	{
		//var len = results.rows.length;
		//alert("Sucursales encontradas: " + len);
		/*for ( var i = 0; i < len; i++) {
			//alert("Direccion = " + results.rows.item(i).Direccion);
		}	*/	 
	}

	function succesSelectSucursalesZona()
	{
		//alert("Funciono el select de sucursales por zona");
	}
	
	function cajerosPorZona(idZona)
	{
		idZonaSeleccionada = idZona;
		db.transaction(selectCajerosZona, errorCB, succesSelectCajerosZona)	
	}
	
	function selectCajerosZona(tx)
	{
		tx.executeSql('SELECT * FROM CAJEROS WHERE idZona =' + idZonaSeleccionada, [], querySuccessSelectCajerosZona, errorCB);
	}
	
	function querySuccessSelectCajerosZona(tx, results)
	{
		var len = results.rows.length;
		//alert("Cajeros encontrados: " + len);
		for ( var i = 0; i < len; i++)
		{
			//alert("Direccion = " + results.rows.item(i).Direccion);
		}		 
	}

	function succesSelectCajerosZona()
	{
		//alert("Funciono el select de cajeros por zona");
	}
	
	function tramitesSucursal(idSucursal)
	{
		idSucursalSeleccionado = idSucursal;
		db.transaction(selectTramitesSucursal, errorCB, succesSelectTramitesSucursal)	
	}
	
	function selectTramitesSucursal(tx)
	{
		tx.executeSql('SELECT * FROM TRAMITES WHERE idSucursal =' + idSucursalSeleccionado, [], querySuccessSelectTramitesSucursal, errorCB);
	}
	
	function querySuccessSelectTramitesSucursal(tx, results)
	{
		var len = results.rows.length;
		for ( var i = 0; i < len; i++)
		{
			$(lblTramites).append(results.rows.item(i).Descripcion+"</br>");
		}		 
	}
	
	function succesSelectTramitesSucursal()
	{
		//alert("Funciono el select de los tramites");
	}
	
	function onDeviceReady()
	{
		db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
		db.transaction(populateDB, errorCB, successCB);
	}
	
	function addListener()
	{
		document.addEventListener("deviceready", onDeviceReady, false);
	}