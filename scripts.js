//Variable q hace visible del carrito
var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    alert("todavia no, pero vuelva pronto ;)");
    //Elimino todos los elmentos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //control del item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    // funciòn controla si hay elementos en el carrito

    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. 
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
     
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}







/// CAMBIO FUENTE, color estilos de TITULO ////


var tituloItem = document.querySelector(".titulo-item");


tituloItem.style.fontFamily = 'Press Start 2P', cursive; 
tituloItem.style.color = "#8A2BE2";



/// CAMBIO FUENTE BUTTON ITEMS //

// Seleccionar el elemento con la clase "boton-item"
var botonItem = document.querySelector(".contenedor .contenedor-items .item .boton-item");

// Cambiar la fuente del texto dentro del botón
botonItem.style.fontFamily = 'Raleway', sans-serif;  





// vinculacion con mi json // 
fetch('packjase.json')
  .then(response => response.json())
  .then(data => {
    
    console.log(data);

    
    data.forEach(item => {
      console.log(`Nombre: ${item.nombre}, Precio: ${item.precio}`);
      
    });
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });




  //// codigo search ///

  document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
  
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Evita que el formulario se envíe normalmente
      const searchTerm = searchInput.value.toLowerCase(); // Obtiene el término de búsqueda en minúsculas
  
      // Realiza la búsqueda en tu archivo JSON
      fetch('packjase.json')
        .then(response => response.json())
        .then(data => {
          // Filtra los elementos que coinciden con el término de búsqueda
          const results = data.filter(item => item.nombre.toLowerCase().includes(searchTerm));
  
          // Ahora puedes mostrar los resultados o realizar otras acciones con ellos
          console.log(results);
        })
        .catch(error => {
          console.error('Error al cargar el archivo JSON:', error);
        });
        cargarDatos();
    });
  });
  
  function mostrarResultados(resultados) {
    const contenedorResultados = document.getElementById('search-results');
  
    // Limpiar cualquier contenido previo en el contenedor de resultados
    contenedorResultados.innerHTML = '';
  
    if (resultados.length === 0) {
      // Mostrar un mensaje si no se encontraron resultados
      contenedorResultados.textContent = 'No se encontraron resultados.';
    } else {
      // Crear y agregar elementos HTML para mostrar los resultados
      resultados.forEach(result => {
        const elementoHTML = document.createElement('div');
        elementoHTML.textContent = result.nombre; // Supongamos que tienes un campo "nombre" en tu JSON
        contenedorResultados.appendChild(elementoHTML);
      });
    }
  }
  
  ///// CODIGO PARA RELACIONAR CON MI JSON ///

const contenedorProductos = document.getElementById("productos");

// Realiza una solicitud AJAX para cargar el archivo JSON
fetch("archivos.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Manipula los datos JSON y crea contenido HTML
    const listaProductos = document.createElement("ul");

    data.forEach((producto) => {
      const itemProducto = document.createElement("li");
      itemProducto.textContent = `${producto.nombre}: $${producto.precio.toFixed(2)}`;
      listaProductos.appendChild(itemProducto);
    });

    // Agrega la lista al contenedor en tu página
    contenedorProductos.appendChild(listaProductos);
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  });


  //// CODIGO DISPLAY ///
 
document.addEventListener("DOMContentLoaded", function () {
    const botonSubpagina1 = document.getElementById("botonSubpagina1");
    const botonSubpagina2 = document.getElementById("botonSubpagina2");
    

    const contenido = document.getElementById("contenido");
    const subpagina1 = document.getElementById("GORRAS");
    const subpagina2 = document.getElementById("REMERAS");
    

    botonSubpagina1.addEventListener("click", function () {
        contenido.innerHTML = subpagina1.innerHTML;
    });

    botonSubpagina2.addEventListener("click", function () {
        contenido.innerHTML = subpagina2.innerHTML;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const botonSubpagina1 = document.getElementById("botonSubpagina1");
    const botonSubpagina2 = document.getElementById("botonSubpagina2");
    const botonSubpagina3 = document.getElementById("botonSubpagina3"); // Nuevo botón

    const contenido = document.getElementById("contenido");
    const subpagina1 = document.getElementById("GORRAS");
    const subpagina2 = document.getElementById("REMERAS");
    const subpagina3 = document.getElementById("TOTEBAGS"); // Nueva subpágina

    botonSubpagina1.addEventListener("click", function () {
        contenido.innerHTML = subpagina1.innerHTML;
    });

    botonSubpagina2.addEventListener("click", function () {
        contenido.innerHTML = subpagina2.innerHTML;
    });

    botonSubpagina3.addEventListener("click", function () { // Nuevo evento para el tercer botón
        contenido.innerHTML = subpagina3.innerHTML;
    });
});
