const carrito = localStorage.getItem('productosCarrito');
console.log(carrito);

for (const producto of carrito) {
    //Por cada producto además de los datos agregamos un botón 
    $("body").append(`<div>
                        <input value="${producto.id}" type="hidden">
                        <h4>  Producto: ${producto.nombre}</h4>
                        <b> $ ${producto.precio}</b>
                        <button class="btn btn-primary btn-sm mr-1 my-1">Comprar</button>
                    </div>`);
}