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

    updateStock() {
        this.stock = this.stock - this.cantidad;
        return this.stock;
    }
    getCantidad() {
        return cantidad;
    }
}

//Declaro el array almacen que contiene objetos de tipo Producto
const almacen = [];
carrito = [];
almacen.push(new Producto("cable adaptador cpu fuente", 600.99, 1, 0, 20));
almacen.push(new Producto("riser adaptador 1x a 16x", 1200.99, 2, 0, 20));
almacen.push(new Producto("riser adaptador multiple", 6200.99, 3, 0, 20));
almacen.push(new Producto("breakout board 12 salidas", 2200.99, 4, 0, 20));
almacen.push(new Producto("fuente servidor 1400w", 40200, 5, 0, 20));
almacen.push(new Producto("estructura de rig para 5 gpus", 11200, 6, 0, 20));
almacen.push(new Producto("rig de mineria 7 gpus", 1120000, 7, 0, 20));
almacen.push(new Producto("rig de mineria 7 gpus", 1304000, 8, 0, 20));
almacen.push(new Producto("rig de mineria 7 gpus", 1650000, 9, 0, 20));

//Almaceno en el storage el contenido del alamacen
localStorage.setItem('productosAlmacen', JSON.stringify(almacen));
console.log(window.localStorage.length);

//Agrego items al carrito de compras desde el listado de productos en almacen
// do {

//     choice = parseInt(prompt("Bienvenido a la tienda Bitba,seleccione el codigo del producto que desee comprar o ingrese 0 para salir \n codigo #1: 1\n codigo #2: 2 \n codigo #3: 3"));
//     if (choice != 0) {
//         carrito.push(almacen.filter(Producto => Producto.id == choice));
//     }

// } while (choice != 0);

console.log(almacen);
console.log(almacen[0]);
console.log(carrito);

let cantidad = 0;

const sendButton1 = document.getElementById("sendBtn1");
sendButton1.addEventListener('click', addToCart);

const sendButton2 = document.getElementById("sendBtn2");
sendButton2.addEventListener('click', addToCart);

const sendButton3 = document.getElementById("sendBtn3");
sendButton3.addEventListener('click', addToCart);

const sendButton4 = document.getElementById("sendBtn4");
sendButton4.addEventListener('click', addToCart);

const sendButton5 = document.getElementById("sendBtn5");
sendButton5.addEventListener('click', addToCart);

const sendButton6 = document.getElementById("sendBtn6");
sendButton6.addEventListener('click', addToCart);

const sendButton7 = document.getElementById("sendBtn7");
sendButton7.addEventListener('click', addToCart);

const sendButton8 = document.getElementById("sendBtn8");
sendButton8.addEventListener('click', addToCart);

const sendButton9 = document.getElementById("sendBtn9");
sendButton9.addEventListener('click', addToCart);

//Agrego la seleccion del producto al carrito y actualizo la burbuja de
//notificacion en el carrito con la cantidad de items
function addToCart() {
    const quantites = document.getElementsByClassName('quantityBtn1B');
    // const prices = document.getElementsByClassName('price');
    let carritoTotal = document.getElementById('cartTotalQ');
    let totalQ = 0;
    // let totalP=0
    for (let i = 0; i < quantites.length; i++) {
        totalQ += parseInt(quantites[i].value)
            // totalP += Number(prices[i].value)*parseInt(quantites[i].value)
    }
    carritoTotal.innerHTML = totalQ;
    if (cantidad != 0) {
        almacen[0].cantidad = cantidad;
        carrito.push(almacen.filter(Producto => Producto.id == 1));
        console.log(carrito);
        //     console.log(carrito[0]);
        //     //Obtengo el numero de productos en el carrito
        //     const itemsNumber = carrito.length;
        //     console.log(itemsNumber);
        //     //Prueba recorro el array para obtener la cantidad
        //     //en cada producto del carrito
        //     const primero = carrito[0];
        //     // console.log(primero.getCantidad());
        //     let totalItems = 0;
        //     for (const item of carrito) {
        //         console.log(item.cantidad);
        //         totalItems = totalItems + item.cantidad;
        //         console.log(totalItems);
        //     }
        //     console.log(totalItems);
        //     //Creo el texto con el valor numerico de items en el carrito
        //     newValue = document.createTextNode(itemsNumber);
        //     //Obtengo los nodos de html correspondientes al carrito
        //     let numItems = [];
        //     numItems[0] = document.getElementById("lblCartCountMobile");
        //     numItems[1] = document.getElementById("lblCartCountDesktop");
        //     console.log(numItems[0]);
        //     console.log(numItems[1]);
        //     numItems[0].appendChild(newValue);
        //     numItems[1].appendChild(newValue);
        //     //Muestro burbuja con nro de items en carrito
        //     if (carrito.length != 0) {
        //         document.getElementById('lblCartCountMobile').style.display = "block";
        //         document.getElementById('lblCartCountDesktop').style.display = "block";
        //     }
        // }
    }

}
//Almaceno en el storage el contenido del carrito
localStorage.setItem('productosCarrito', JSON.stringify(carrito));
console.log(window.localStorage.length);