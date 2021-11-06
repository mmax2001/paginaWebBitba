//Creo la clase Producto
class Producto {
    constructor(nombre, precio, id, cantidad) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.id = parseInt(id);
        this.cantidad = parseInt(cantidad);
        this.vendido = false;
        this.valorTotal = this.precio * this.cantidad;
    }
    sumarIva() {
        this.precio = this.precio * 1.21;
    }

}

//Declaro el array almacen que contiene objetos de tipo Producto
const almacen = [];
carrito = [];
almacen.push(new Producto("cable adaptador cpu fuente", 600, 1, 0));
almacen.push(new Producto("riser adaptador 1x a 16x", 1200, 2, 0));
almacen.push(new Producto("riser adaptador multiple", 6200, 3, 0));

//Agrego items al carrito de compras desde el listado de productos en almacen

do {

    choice = parseInt(prompt("Bienvenido a la tienda Bitba,seleccione el codigo del producto que desee comprar o ingrese 0 para salir \n codigo #1: 1\n codigo #2: 2 \n codigo #3: 3"));
    carrito.push(almacen.filter(Producto => Producto.id == choice));


} while (choice != 0);
console.log(almacen);
console.log(almacen[0]);
console.log(carrito);