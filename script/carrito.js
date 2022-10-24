
let carritoDeCompras = [];


const contenedorCarrito = document.getElementById ('carrito-contenedor');
const contadorCarrito = document.getElementById ('contador-items');
const precioFinal = document.getElementById ('precio-total');
const botonVaciarCarro = document.querySelector ('#btnVaciarCarrito');


/*fx para agregar productos en el carrito*/
function agregarCarrito (id) {
    let existencia = carritoDeCompras.find(produc => produc.id == id)
    if (existencia){
        existencia.cantidad ++;
        document.getElementById(`cant${existencia.id}`).innerHTML = `<p id="cant${existencia.id}">Cantidad: ${existencia.cantidad}</p>`
        actualizarCarrito()
    }else {
        let agregarItem = productos.find(items => items.id == id)
        agregarItem.cantidad = 1
        carritoDeCompras.push(agregarItem);
        mostrarCarrito(agregarItem);
        actualizarCarrito();
        
    }
    /*fx guardar datos en el localstorage*/
    guardarDatos ("listaCompra", JSON.stringify(carritoDeCompras));
}

/*fx para mostrar productos en carrito*/
function mostrarCarrito (agregarItem) {
    let div = document.createElement ('div')
    div.className = 'productoCarrito'
    div.innerHTML = `<p>${agregarItem.nombre}</p>
                    <p>$${agregarItem.precio}</p>
                    <p id="cant${agregarItem.id}">Cantidad: ${agregarItem.cantidad}</p>
                    <button class="boton-eliminar" id="eliminar ${agregarItem.id}">
                    <i class="fas fa-trash-alt"></i>
                    </button>`
contenedorCarrito.appendChild(div)

//boton para eliminar productos del carrito de a uno
let btnEliminar = document.getElementById(`eliminar ${agregarItem.id}`); 
btnEliminar.addEventListener ('click', () => {
    if (agregarItem.cantidad == 1){
        carritoDeCompras = carritoDeCompras.filter(items => items.id !== agregarItem.id)
btnEliminar.parentElement.remove();
actualizarCarrito();
    }else {
        agregarItem.cantidad = agregarItem.cantidad - 1;
        document.getElementById(`cant${agregarItem.id}`).innerHTML = `<p id="cant${agregarItem.id}">Cantidad: ${agregarItem.cantidad}</p>`
        
        actualizarCarrito();
    
    }
    /*Se llama a la fx nuevamente para guardar datos en caso de eliminar, cerrar o actualizar page*/
    guardarDatos ("listaCompra", JSON.stringify(carritoDeCompras));
})

}

//fx para actualizar carrito
function actualizarCarrito () { 
    carritoDeCompras.length > 0 ? document.getElementById ('btnRealizarCompra').style.display = "block" : document.getElementById('btnRealizarCompra').style.display = "none";//ternario
    carritoDeCompras.length > 0 ? document.getElementById ('btnVaciarCarrito').style.display = "block" : document.getElementById('btnVaciarCarrito').style.display = "none";//ternario
    contadorCarrito.innerText = carritoDeCompras.reduce ((acc, el) => acc + el.cantidad, 0);
    precioFinal.innerText = carritoDeCompras.reduce ((acc, el) => acc + (el.precio * el.cantidad), 0);
}


//Boton que lleva a checkout para finalizar compra
function realizarCompra () {
    setTimeout(() => {
        location.href = "../pages/carrito.html"
    }, 500);

}
//fx para vaciar carrito 
function vaciarCarrito () { 
    document.getElementById('carrito-contenedor').innerHTML = ""
    carritoDeCompras = [];
    actualizarCarrito();
    guardarDatos ("listaCompra", JSON.stringify(carritoDeCompras));
}


botonVaciarCarro.addEventListener('click', vaciarCarrito);


/*fx para traer los objetos del localStorage*/
function recuperarDatos () {
    let productoRecuperado = JSON.parse (localStorage.getItem("listaCompra"))
    if (productoRecuperado) {
        productoRecuperado.forEach (produc=> {
            mostrarCarrito(produc)
            carritoDeCompras.push(produc)
            actualizarCarrito();
    })
    }
    
}

recuperarDatos(); 