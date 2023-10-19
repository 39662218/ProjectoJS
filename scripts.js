document.addEventListener("DOMContentLoaded", function () {

    //Variable q hace visible del carrito
    var carritoVisible = false;

    //Espermos que todos los elementos de la pàgina cargen para ejecutar el script
    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', ready);
    } else {
        ready();
    }

    function ready() {

        //Agregremos funcionalidad a los botones eliminar del carrito
        var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
        for (var i = 0; i < botonesEliminarItem.length; i++) {
            var button = botonesEliminarItem[i];
            button.addEventListener('click', eliminarItemCarrito);
        }

        //Agrego funcionalidad al boton sumar cantidad
        var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
        for (var i = 0; i < botonesSumarCantidad.length; i++) {
            var button = botonesSumarCantidad[i];
            button.addEventListener('click', sumarCantidad);
        }

        //Agrego funcionalidad al buton restar cantidad
        var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
        for (var i = 0; i < botonesRestarCantidad.length; i++) {
            var button = botonesRestarCantidad[i];
            button.addEventListener('click', restarCantidad);
        }

        //Agregamos funcionalidad al boton Agregar al carrito
        var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
        for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
            var button = botonesAgregarAlCarrito[i];
            button.addEventListener('click', agregarAlCarritoClicked);
        }

        //Agregamos funcionalidad al botón comprar
        document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
    }
    //Eliminamos todos los elementos del carrito y lo ocultamos
    function pagarClicked() {
        alert("todavia no, pero vuelva pronto ;)");
        //Elimino todos los elmentos del carrito
        var carritoItems = document.getElementsByClassName('carrito-items')[0];
        while (carritoItems.hasChildNodes()) {
            carritoItems.removeChild(carritoItems.firstChild);
        }
        actualizarTotalCarrito();
        ocultarCarrito();
    }
    //Funciòn que controla el boton clickeado de agregar al carrito
    function agregarAlCarritoClicked(event) {
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
    function hacerVisibleCarrito() {
        carritoVisible = true;
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '0';
        carrito.style.opacity = '1';

        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '60%';
    }

    //Funciòn que agrega un item al carrito
    function agregarItemAlCarrito(titulo, precio, imagenSrc) {
        var item = document.createElement('div');
        item.classList.add = ('item');
        var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

        //control del item que intenta ingresar no se encuentre en el carrito
        var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
        for (var i = 0; i < nombresItemsCarrito.length; i++) {
            if (nombresItemsCarrito[i].innerText == titulo) {
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
    `;
        item.innerHTML = itemCarritoContenido;
        itemsCarrito.append(item);

        //Agregamos la funcionalidad eliminar al nuevo item
        item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

        //Agregmos al funcionalidad restar cantidad del nuevo item
        var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
        botonRestarCantidad.addEventListener('click', restarCantidad);

        //Agregamos la funcionalidad sumar cantidad del nuevo item
        var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
        botonSumarCantidad.addEventListener('click', sumarCantidad);

        //Actualizamos total
        actualizarTotalCarrito();
    }
    //Aumento en uno la cantidad del elemento seleccionado
    function sumarCantidad(event) {
        var buttonClicked = event.target;
        var selector = buttonClicked.parentElement;
        console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
        var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
        cantidadActual++;
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
    //Resto en uno la cantidad del elemento seleccionado
    function restarCantidad(event) {
        var buttonClicked = event.target;
        var selector = buttonClicked.parentElement;
        console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
        var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
        cantidadActual--;
        if (cantidadActual >= 1) {
            selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
            actualizarTotalCarrito();
        }
    }

    //Elimino el item seleccionado del carrito
    function eliminarItemCarrito(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        //Actualizamos el total del carrito
        actualizarTotalCarrito();

        // funciòn controla si hay elementos en el carrito
        ocultarCarrito();
    }
    //Funciòn que controla si hay elementos en el carrito. 
    function ocultarCarrito() {
        var carritoItems = document.getElementsByClassName('carrito-items')[0];
        if (carritoItems.childElementCount == 0) {
            var carrito = document.getElementsByClassName('carrito')[0];
            carrito.style.marginRight = '-100%';
            carrito.style.opacity = '0';
            carritoVisible = false;

            var items = document.getElementsByClassName('contenedor-items')[0];
            items.style.width = '100%';
        }
    }
    //Actualizamos el total de Carrito
    function actualizarTotalCarrito() {
        //seleccionamos el contenedor carrito
        var carritoContenedor = document.getElementsByClassName('carrito')[0];
        var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
        var total = 0;

        for (var i = 0; i < carritoItems.length; i++) {
            var item = carritoItems[i];
            var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];

            var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
            var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
            console.log(precio);
            var cantidad = cantidadItem.value;
            total = total + (precio * cantidad);
        }
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";

    }
    //// finalizacion codigo carrito ///




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

        botonSubpagina3.addEventListener("click", function () {
            contenido.innerHTML = subpagina3.innerHTML;
        });


             
        
    });





  /*funcion buscador */




    document.addEventListener("DOMContentLoaded", function () { 
  fetch('archivos.json')
  .then(response => response.json())
  .then(data => {
    
[
    
    {
        "tipo": "GORRA",
        "nombre": "CAP DIOGREEN",
        "imagen": "../images/imagesgorras/JOJO'S/jojos1.png",
        "precio": 15000
    },
    {
        "tipo": "GORRA",
        "nombre": "CAP ANTHONIO",
        "imagen": "../images/imagesgorras/JOJO'S/jojos5.png",
        "precio": 17000
    },
    {
        "tipo": "GORRA",
        "nombre": "CAP PINKBLUE",
        "imagen": "../images/imagesgorras/JOJO'S/jojos2.png",
        "precio": 25000
    },
    {
        "tipo": "GORRA",
        "nombre": "CAP MYEYES",
        "imagen": "../images/imagesgorras/JOJO'S/jojos3.png",
        "precio": 35000
    },
    {
        "tipo": "GORRA",
        "nombre": "CAP OVERPINK",
        "imagen": "../images/imagesgorras/JOJO'S/jojos4.png",
        "precio": 18000
    },
    {
        "tipo": "GORRA",
        "nombre": "CAP KILLUA",
        "imagen": "../images/imagesgorras/HUNTER X HUNTER/hunter1.png",
        "precio": 32000
    },
    {
        "tipo": "GORRA",
        "nombre": "CAP HISOKALOVE",
        "imagen": "../images/imagesgorras/HUNTER X HUNTER/hunter2.png",
        "precio": 18000
    },
    {
        "tipo": "GORRA",
        "nombre": "CAP BESTIES",
        "imagen": "../images/imagesgorras/HUNTER X HUNTER/hunter3.png",
        "precio": 54000
    },
    {
        "tipo": "GORRA",
        "nombre": "CAP HISOKAEVIL",
        "imagen": "../images/imagesgorras/HUNTER X HUNTER/hunter4.png",
        "precio": 32000
    },
    {
        "tipo": "GORRA",
        "nombre": "CAP KURAPIKA",
        "imagen": "../images/imagesgorras/HUNTER X HUNTER/hunter5.png",
        "precio": 42800
    },
    {
        "tipo": "GORRA",
        "nombre": "CAP LOVERS",
        "imagen": "../images/imagesgorras/ATTACK ON TITAN/AOT1.png",
        "precio": 15000
    },
    {
        "tipo": "GORRA",
        "nombre": "CAP FUEGO",
        "imagen": "../images/imagesgorras/ATTACK ON TITAN/AOT2.png",
        "precio": 15000
    },
    {
        "tipo": "GORRA",
        "nombre": "CAP VENGANZA",
        "imagen": "../images/imagesgorras/ATTACK ON TITAN/AOT3.png",
        "precio": 15000
    },
    {
        "tipo": "GORRA",
        "nombre": "CAP MIKAZA",
        "imagen": "../images/imagesgorras/ATTACK ON TITAN/AOT4.png",
        "precio": 15000
    },
    {
        "tipo": "GORRA",
        "nombre": "CAP LEVI",
        "imagen": "../images/imagesgorras/ATTACK ON TITAN/AOT5.png",
        "precio": 14000
    },
    {
        "tipo": "GORRA",
        "nombre": "CAP LEVI",
        "imagen": "../images/imagesgorras/ATTACK ON TITAN/AOT6.png",
        "precio": 19000
    },
    {
     "tipo": "T-SHIRT",
    "nombre": "T-SHIRT DIO",
    "imagen": "../images/imagesremeras/jojos/jojos1.png",
    "precio": 15000

    },
    
    {
        "tipo": "T-SHIRT",
        "nombre": "T-SHIRT VALANTINE",
        "imagen": "../images/imagesremeras/jojos/jojos3.png",
        "precio": 25000
    },
    {
        "tipo": "T-SHIRT",
        "nombre": "T-SHIRT AESTHETIC",
        "imagen": "../images/imagesremeras/jojos/jojos4.png",
        "precio": 35000
    },
    {
        "tipo": "T-SHIRT",
        "nombre": "T-SHIRT JOSUKE",
        "imagen": "../images/imagesremeras/jojos/jojos6.png",
        "precio": 18000
    },
    {
        "tipo": "T-SHIRT",
        "nombre": "T-SHIRT HIZOKA",
        "imagen": "../images/imagesremeras/hunter/hunter1.png",
        "precio": 32000
    },
    {
        "tipo": "T-SHIRT",
        "nombre": "T-SHIRT BESTIES",
        "imagen": "../images/imagesremeras/hunter/hunter3.png",
        "precio": 18000
    },
    {
        "tipo": "T-SHIRT",
        "nombre": "T-SHIRT CHROLLO",
        "imagen": "../images/imagesremeras/hunter/hunter2.png",
        "precio": 54000
    },
    {
        "tipo": "T-SHIRT",
        "nombre": "T-SHIRT KILLUALOVE",
        "imagen": "../images/imagesremeras/hunter/hunter4.png",
        "precio": 32000
    },
    {
        "tipo": "T-SHIRT",
        "nombre": "T-SHIRT HISTORIA&YMIR",
        "imagen": "../images/imagesremeras/attack on titan/AOT6.png",
        "precio": 42800
    },
    {
        "tipo": "T-SHIRT",
        "nombre": "T-SHIR MIKAZA",
        "imagen": "../images/imagesremeras/attack on titan/AOT2.png",
        "precio": 15000
    },
    {
        "tipo": "T-SHIRT",
        "nombre": "T-SHIR FRIENDS",
        "imagen": "../images/imagesremeras/attack on titan/AOT5.png",
        "precio": 15000
    },
    {
        "tipo": "T-SHIRT",
        "nombre": "T-SHIRT HEROES",
        "imagen": "../images/imagesremeras/attack on titan/AOT3.png",
        "precio": 15000
    },
    {
        "tipo": "T-SHIRT",
        "nombre": "T-SHIRT TITANES",
        "imagen": "../images/imagesremeras/attack on titan/AOT4.png",
        "precio": 15000
    },
    {
        "tipo": "T-SHIRT",
        "nombre": "T-SHIR CIRCULOS",
        "imagen": "../images/imagesremeras/jojos/jojos3.png",
        "precio": 14000
    },
    {
        "tipo": "T-SHIRT",
        "nombre": "T-SHIRT FUSION",
        "imagen": "../images/imagesremeras/jojos/jojos5.png",
        "precio": 19000
    },
    {
        "tipo": "T-SHIRT",
        "nombre": "T-SHIRT GUERRA",
        "imagen": "../images/imagesremeras/attack on titan/AOT1.png",
        "precio": 17000
    },
    {
      "nombre": "TOTE BAG OVERPINK",
      "imagen": "../images/imagestotebag/jojos/jojos1.png",
      "precio": 15000
    },
    {
      "tipo": "TOTEBAGS",
      "nombre": "TOTEBAG DIO",
      "imagen": "../images/imagestotebag/jojos/jojos2.png",
      "precio": 25000
    },
    {
      "tipo": "TOTEBAGS",
      "nombre": "TOTEBAG",
      "imagen": "../images/imagestotebag/attackontitan/AOT3.png",
      "precio": 35000
    },
    {
      "tipo": "TOTEBAGS",
      "nombre": "TOTEBAG ROMA",
      "imagen": "../images/imagestotebag/jojos/jojos4.png",
      "precio": 18000
    },
    {
      "tipo": "TOTEBAGS",
      "nombre": "TOTEBAG JOLYNE",
      "imagen": "../images/imagestotebag/jojos/jojos5.png",
      "precio": 32000
    },
    {
      "tipo": "TOTEBAGS",
      "nombre": "TOTEBAG FULLGREEN",
      "imagen": "../images/imagestotebag/jojos/jojos6.png",
      "precio": 18000
    },
    {
      "nombre": "TOTEBAG WOMANS",
      "imagen": "../images/imagestotebag/attackontitan/AOT1.png",
      "precio": 54000
    },
    {
      "tipo": "TOTEBAGS",
      "nombre": "TOTEBAG LEVI",
      "imagen": "../images/imagestotebag/attackontitan/AOT6.png",
      "precio": 32000
    },
    {
      "tipo": "TOTEBAGS",
      "nombre": "TOTEBAG KILLUA",
      "imagen": "../images/imagestotebag/hunterxhunter/hunter1.png",
      "precio": 42800
    },
    {
      "tipo": "TOTEBAGS",
      "nombre": "TOTEBAG EREN VS REINER",
      "imagen": "../images/imagestotebag/attackontitan/AOT2.png",
      "precio": 15000
    },
    {
      "tipo": "TOTEBAGS",
      "nombre": "TOTEBAG SOFTPINK",
      "imagen": "../images/imagestotebag/attackontitan/AOT5.png",
      "precio": 15000
    },
    {
      "tipo": "TOTEBAGS",
      "nombre": "TOTEBAG ORANGE",
      "imagen": "../images/imagestotebag/hunterxhunter/hunter4.png",
      "precio": 15000
    },
    {
      "tipo": "TOTEBAGS",
      "nombre": "TOTEBAG BESTIES",
      "imagen": "../images/imagestotebag/hunterxhunter/hunter2.png",
      "precio": 15000
    },
    {
      "tipo": "TOTEBAGS",
      "nombre": "TOTEBAG TITANES",
      "imagen": "../images/imagestotebag/attackontitan/AOT4.png",
      "precio": 14000
    },
    {
      "tipo": "TOTEBAGS",
      "nombre": "TOTEBAG BESTIES",
      "imagen": "../images/imagestotebag/hunterxhunter/hunter2.png",
      "precio": 19000
    },
    {
      "tipo": "TOTEBAGS",
      "nombre": "TOTEBAG SOOVERGREEN",
      "imagen": "../images/imagestotebag/jojos/jojos3.png",
      "precio": 17000
    }
  ]
  })
  

  const consulta = document.getElementById('campo-de-busqueda').value.toLowerCase();
const resultadosContainer = document.getElementById('resultados-container');


resultadosContainer.innerHTML = '';


resultados.forEach(producto => {
  if (producto.nombre.toLowerCase().includes(consulta)) {
    const elementoResultado = document.createElement('div');
    elementoResultado.className = 'item';
    
    
    elementoResultado.innerHTML = `
      <span class="titulo-item">${producto.nombre}</span>
      <img src="${producto.imagen}" alt="" class="img-item">
      <span class="precio-item">$${producto.precio}</span>
      <button class="boton-item">Agregar al Carrito</button>
    `;

    resultadosContainer.appendChild(elementoResultado);
  }
});


document.addEventListener("DOMContentLoaded", function () { 
    const consultaInput = document.getElementById('campo-de-busqueda');
    const resultadosContainer = document.getElementById('resultados-container');
  
    consultaInput.addEventListener('input', () => {
      const consulta = consultaInput.value.toLowerCase();
      filtrarResultados(consulta);
    });
  
    cargarJSON();
  
    function cargarJSON() {
      fetch('archivos.json')
        .then(response => response.json())
        .then(data => {
          // Almacena tus datos JSON en una variable llamada 'resultados'
          const resultados = data;
          // Llama a la función para mostrar los resultados
          filtrarResultados('');
        })
        .catch(error => {
          console.error('Error al cargar el archivo JSON:', error);
        });
    }
  
    function filtrarResultados(consulta) {
      resultadosContainer.innerHTML = '';
      resultados.forEach(producto => {
        if (producto.nombre.toLowerCase().includes(consulta)) {
          const elementoResultado = document.createElement('div');
          elementoResultado.className = 'item';
          
          elementoResultado.innerHTML = `
            <span class="titulo-item">${producto.nombre}</span>
            <img src="${producto.imagen}" alt="" class="img-item">
            <span class="precio-item">$${producto.precio}</span>
            <button class="boton-item">Agregar al Carrito</button>
          `;
    
          resultadosContainer.appendChild(elementoResultado);
        }
      });
    }
  });
  


    });
    


  

});

