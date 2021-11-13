//Guia 61c HG19010 tpi2021
var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td><td class='accion'></td></tr>";
	 var productos=null;
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "electronicos":code="c1";break;
	    case "joyeria":code="c2";break;
		case "caballeros":code="c3";break;
		case "damas":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	  
	function listarProductos(productos) {
	  var precio=document.getElementById("price"); 
	  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
	  var num=productos.length;
	  var listado=document.getElementById("listado");
	  var ids,titles,prices,descriptions,categories,fotos,acciones;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  prices=document.getElementsByClassName("price");
	  acciones=document.getElementsByClassName("accion");   
	  if(orden===0) {orden=-1;precio.innerHTML="Precio"}
	  else
	     if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
	     else 
	       if(orden==-1) {ordenarDesc(productos,"price");precio.innerHTML="Precio D";precio.style.color="blue"}
	
		  
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=productos[nfila].id;
		titles[nfila].innerHTML=productos[nfila].title;
		descriptions[nfila].innerHTML=productos[nfila].description;
		categories[nfila].innerHTML=productos[nfila].category;
		catcode=codigoCat(productos[nfila].category);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+productos[nfila].price;
		fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
		acciones[nfila].innerHTML="<button onclick='eliminarProducto("+productos[nfila].id+");obtenerProductos();'>Eliminar producto</button>";
		}
	}

function obtenerProductos() {
	fetch('https://retoolapi.dev/q7GO1T/productos')
    	.then(res=>res.json())
        .then(data=>{
			productos=data;
			productos.forEach(
				function(producto){
					producto.price=parseFloat(producto.price)
				});
	listarProductos(data)})
}

function agregarProducto(){
	var productoadd={image:document.getElementById("imagen").value,
	price:parseFloat(document.getElementById("precio").value),
	title:document.getElementById("titulo").value,
	category:document.getElementById("categoria").value,
	description:document.getElementById("descripcion").value}

	var addresult;
	fetch("https://retoolapi.dev/q7GO1T/productos",
	{
		method:"POST",
		headers: {
			//'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Accept': '*/*',
			'Host': 'retoolapi.dev',
			'Accept-Encoding': 'gzip, deflate, br',
			'Connection': 'keep-alive',
		},
		body: JSON.stringify(productoadd),
	})
	.then(res=>res.json())
	.then(data=>{
		addresult=data;
		obtenerProductos();
	}).catch(showError);
}

/*function modificarProducto(){
	var productomod={id:parseInt(document.getElementById("id").value),
	image:document.getElementById("imagen").value,
	price:parseFloat(document.getElementById("precio").value),
	title:document.getElementById("titulo").value,
	category:document.getElementById("categoria").value,
	description:document.getElementById("descripcion").value}	

	var actresult;
	fetch("https://retoolapi.dev/q7GO1T/productos/"+productomod.id,
	{
		method:"PUT",
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json'
		},
  		body: JSON.stringify(productomod)
  		
	}).then(response=>response.json()).then(data=>{
		actresult=data;
		obtenerProductos();
	});
}*/

function eliminarProducto(id){
	var delresult;
	var url= "https://retoolapi.dev/q7GO1T/productos/"+id
	fetch(url,
	{
		method:"DELETE",
		headers: {
			//'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Accept': '*/*',
			'Host': 'retoolapi.dev',
			'Accept-Encoding': 'gzip, deflate, br',
			'Connection': 'keep-alive',
		}
	}).then(res=>res.json())
		.then(data=>{
			delresult=data;
			obtenerProductos();
		}).catch(showError);

}

function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}

function showError(err) { 
	console.log('muestro error', err);
}