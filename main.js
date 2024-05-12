//PRODUCTOS
const productos = [
    //CELULARES
    {
        id: "celular-01",
        titulo: "Celular 01",
        imagen: "./images/celulares/cel1.jpg",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 1000
    },
    {
        id: "celular-02",
        titulo: "Celular 02",
        imagen: "./images/celulares/cel2.jpg",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 1000
    },
    {
        id: "celular-03",
        titulo: "Celular 03",
        imagen: "./images/celulares/cel3.jpg",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 1000
    },
    {
        id: "celular-04",
        titulo: "Celular 04",
        imagen: "./images/celulares/cel4.png",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 1000
    },
    {
        id: "celular-05",
        titulo: "Celular 05",
        imagen: "./images/celulares/cel5.jpg",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 1000
    },
    // Consolas
    {
        id: "consolas-01",
        titulo: "Consolas 01",
        imagen: "./images/consolas/con1.jpg",
        categoria: {
            nombre: "Consolas",
            id: "consolas"
        },
        precio: 1000
    },
    {
        id: "consolas-02",
        titulo: "Consolas 02",
        imagen: "./images/consolas/con2.png",
        categoria: {
            nombre: "Consolas",
            id: "consolas"
        },
        precio: 1000
    },
    {
        id: "consolas-03",
        titulo: "Consolas 03",
        imagen: "./images/consolas/con3.jpg",
        categoria: {
            nombre: "Consolas",
            id: "consolas"
        },
        precio: 1000
    },
    {
        id: "consolas-04",
        titulo: "Consolas 04",
        imagen: "./images/consolas/con4.jpg",
        categoria: {
            nombre: "Consolas",
            id: "consolas"
        },
        precio: 1000
    },
    {
        id: "consolas-05",
        titulo: "Consolas 05",
        imagen: "./images/consolas/con5.jpg",
        categoria: {
            nombre: "Consolas",
            id: "consolas"
        },
        precio: 1000
    },
    // Notebooks
    {
        id: "notebooks-01",
        titulo: "Notebooks 01",
        imagen: "./images/notebooks/not1.jpg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks"
        },
        precio: 1000
    },
    {
        id: "notebooks-02",
        titulo: "Notebooks 02",
        imagen: "./images/notebooks/not2.jpg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks"
        },
        precio: 1000
    },
    {
        id: "notebooks-03",
        titulo: "Notebooks 03",
        imagen: "./images/notebooks/not3.jpg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks"
        },
        precio: 1000
    },
    {
        id: "notebooks-04",
        titulo: "Notebooks 04",
        imagen: "./images/notebooks/not4.jpg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks"
        },
        precio: 1000
    },                            
    {
        id: "notebooks-05",
        titulo: "Notebooks 05",
        imagen: "./images/notebooks/not5.jpg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks"
        },
        precio: 1000    
    }
];
    
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");

function cargarProductos(productosElegidos) {      
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
            </div>            
        `;

        contenedorProductos.append(div);
    });
}    

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id !== "todos") {
            const productoCategoria = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria[0].categoria.nombre;
            cargarProductos(productoCategoria);

            // Actualizar el número en el ícono del carrito
            actualizarNumeroCarrito();
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);

            // Actualizar el número en el ícono del carrito
            actualizarNumeroCarrito();
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const botonesAgregar = document.querySelectorAll(".producto-agregar");
    const numeritoCarrito = document.querySelector(".numerito");

    // Función para obtener la cantidad de productos en el carrito
    function obtenerCantidadProductosEnCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        return carrito.length;
    }

    // Función para actualizar el número en el ícono del carrito
    function actualizarNumeroCarrito() {
        const numeritoCarrito = document.querySelector(".numerito");
        numeritoCarrito.textContent = obtenerCantidadProductosEnCarrito();
    }

    // Llamamos a la función para actualizar el número en el ícono del carrito cuando se carga la página
    actualizarNumeroCarrito();

    // Función para agregar un producto al carrito
    function agregarAlCarrito(event) {
        const boton = event.currentTarget;
        const productoSeleccionadoId = boton.dataset.id;
        const producto = productos.find(p => p.id === productoSeleccionadoId);

        const productoSeleccionado = {
            id: producto.id,
            titulo: producto.titulo,
            imagen: producto.imagen,
            precio: producto.precio,
            cantidad: 1 // Inicialmente, agregamos una unidad del producto
        };

        // Verificamos si ya hay productos en el carrito en el Local Storage
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        // Buscamos si el producto ya está en el carrito
        const productoExistente = carrito.find(p => p.id === productoSeleccionado.id);

        if (productoExistente) {
            // Si el producto ya está en el carrito, aumentamos su cantidad
            productoExistente.cantidad++;
        } else {
            // Si el producto no está en el carrito, lo agregamos
            carrito.push(productoSeleccionado);
        }

        // Guardamos el carrito actualizado en el Local Storage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        // Actualizamos el número en el ícono del carrito
        numeritoCarrito.textContent = carrito.length; // Actualizamos el número con la cantidad de productos en el carrito

        // Redireccionamos al usuario a la página del carrito
        window.location.href = "carrito.html";
    }

    // Agregamos un evento de clic a cada botón "Agregar"
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
});