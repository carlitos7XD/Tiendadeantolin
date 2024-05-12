document.addEventListener("DOMContentLoaded", function() {
    const contenedorCarrito = document.querySelector(".contenedor-carrito");
    const carritoProductos = document.querySelector(".carrito-productos");
    const carritoAcciones = document.querySelector(".carrito-acciones");
    const carritoTotal = document.querySelector("#total");
    const botonVaciarCarrito = document.querySelector(".carrito-acciones-vaciar");
    const botonComprar = document.querySelector(".carrito-acciones-comprar");

    let carrito = [];

    // Recuperar productos del Local Storage al cargar la página
    const productosLocalStorage = JSON.parse(localStorage.getItem('carrito'));
    if (productosLocalStorage) {
        carrito = productosLocalStorage;
    }

    // Función para mostrar los productos agregados al carrito
    function mostrarCarrito() {
        carritoProductos.innerHTML = "";
        carrito.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${item.imagen}" alt="${item.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${item.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${item.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${item.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${item.precio * item.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" data-id="${item.id}"><i class="bi bi-trash-fill"></i></button>
            `;
            carritoProductos.appendChild(div);
        });

        calcularTotal();
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(id) {
        carrito = carrito.filter(item => item.id !== id);
        mostrarCarrito();
        actualizarLocalStorage();
    }

    // Función para calcular el total de la compra
    function calcularTotal() {
        const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        carritoTotal.textContent = total;
    }

    // Función para vaciar el carrito
    function vaciarCarrito() {
        carrito = [];
        mostrarCarrito();
        actualizarLocalStorage();
    }

    // Función para procesar la compra
    function procesarCompra() {
        // Aquí podrías agregar la lógica para procesar la compra, como enviar los datos del carrito a un servidor, mostrar un mensaje de confirmación, etc.
        console.log("Compra procesada");
        vaciarCarrito(); // Por ejemplo, después de procesar la compra, podrías vaciar el carrito
    }

    // Evento para eliminar un producto del carrito al hacer clic en el botón de eliminar
    carritoProductos.addEventListener("click", function(event) {
        if (event.target.classList.contains("carrito-producto-eliminar")) {
            const productoId = event.target.parentElement.dataset.id;
            eliminarProducto(productoId);
        }
    });

    // Evento para vaciar el carrito al hacer clic en el botón de vaciar
    botonVaciarCarrito.addEventListener("click", vaciarCarrito);

    // Evento para procesar la compra al hacer clic en el botón de comprar
    botonComprar.addEventListener("click", procesarCompra);

    // Llamada inicial para mostrar los productos agregados al carrito
    mostrarCarrito();

    // Función para actualizar el Local Storage
    function actualizarLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
});
