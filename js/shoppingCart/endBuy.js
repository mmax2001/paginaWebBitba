const carrito = localStorage.getItem('productosCarrito');
console.log("el carrito es :", carrito);

//Creo la clase Producto

class Producto {
    constructor(nombre, precio, id, cantidad, stock) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.id = parseInt(id);
        this.cantidad = parseInt(cantidad);
        this.stock = parseInt(stock);
        this.vendido = false;
        this.valorTotal = this.precio * this.cantidad;
    }
    sumarIva() {
        this.precio = this.precio * 1.21;
    }

    set updateStock(cantidad) {
        this.stock = this.stock - cantidad;
    }
    getCantidad() {
        return cantidad;
    }
}

//Declaro el array almacen que contiene objetos de tipo Producto

const almacen = [];

almacen.push(new Producto("cable adaptador cpu fuente", 600.99, 1, 0, 20));
almacen.push(new Producto("riser adaptador 1x a 16x", 1200.99, 2, 0, 20));
almacen.push(new Producto("riser adaptador multiple", 6200.99, 3, 0, 20));
almacen.push(new Producto("breakout board 12 salidas", 2200.99, 4, 0, 20));
almacen.push(new Producto("fuente servidor 1400w", 40200, 5, 0, 20));
almacen.push(new Producto("estructura de rig para 5 gpus", 11200, 6, 0, 20));
almacen.push(new Producto("rig de mineria 7 gpus", 1120000, 7, 0, 20));
almacen.push(new Producto("rig de mineria 7 gpus", 1304000, 8, 0, 20));
almacen.push(new Producto("rig de mineria 7 gpus", 1650000, 9, 0, 20));


for (const producto of almacen) {
    //Por cada producto además de los datos agregamos un botón 
    $(".container-p").append(`<div>
                        <input value="${producto.id}" type="hidden">
                        <h4>  Producto: ${producto.nombre}</h4>
                        <b> $ ${producto.precio}</b>
                        <button class="btn btn-primary btn-sm mr-1 my-1">Comprar</button>
                    </div>`);
}