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
const carrito = [];
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

//Compruebo por consola contenidos en arrays almacen y carrito

// console.log(almacen);
// console.log(almacen[0]);
// console.log(carrito);

//Capturo los eventos en cada boton "Agregar al carrito"
//y en el numero seleccionado de cantidad de items

const sendButton1 = document.getElementById("sendBtn1");
sendButton1.addEventListener('click', (event) => {
    const quantity1 = document.getElementById("quantityBtn1");
    quantity1.addEventListener('change', addToBuyCart(parseInt(1), parseInt(quantity1.value)));
})

const sendButton2 = document.getElementById("sendBtn2");
sendButton2.addEventListener('click', (event) => {
    const quantity2 = document.getElementById("quantityBtn2");
    quantity2.addEventListener('change', addToBuyCart(2, parseInt(quantity2.value)));
})

const sendButton3 = document.getElementById("sendBtn3");
sendButton3.addEventListener('click', (event) => {
    const quantity3 = document.getElementById("quantityBtn3");
    quantity3.addEventListener('change', addToBuyCart(3, parseInt(quantity3.value)));
})

const sendButton4 = document.getElementById("sendBtn4");
sendButton4.addEventListener('click', (event) => {
    const quantity4 = document.getElementById("quantityBtn4");
    quantity4.addEventListener('change', addToBuyCart(4, parseInt(quantity4.value)));
})

const sendButton5 = document.getElementById("sendBtn5");
sendButton5.addEventListener('click', (event) => {
    const quantity5 = document.getElementById("quantityBtn5");
    quantity5.addEventListener('change', addToBuyCart(5, parseInt(quantity5.value)));
})

const sendButton6 = document.getElementById("sendBtn6");
sendButton6.addEventListener('click', (event) => {
    const quantity6 = document.getElementById("quantityBtn6");
    quantity6.addEventListener('change', addToBuyCart(6, parseInt(quantity6.value)));
})

const sendButton7 = document.getElementById("sendBtn7");
sendButton7.addEventListener('click', (event) => {
    const quantity7 = document.getElementById("quantityBtn7");
    quantity7.addEventListener('change', addToBuyCart(7, parseInt(quantity7.value)));
})

const sendButton8 = document.getElementById("sendBtn8");
sendButton8.addEventListener('click', (event) => {
    const quantity8 = document.getElementById("quantityBtn8");
    quantity8.addEventListener('change', addToBuyCart(8, parseInt(quantity8.value)));
})

const sendButton9 = document.getElementById("sendBtn9");
sendButton9.addEventListener('click', (event) => {
    const quantity9 = document.getElementById("quantityBtn9");
    quantity9.addEventListener('change', addToBuyCart(9, parseInt(quantity9.value)));
})

// const sendButton1 = document.getElementById("sendBtn1");
// const quantity1 = document.getElementById("quantityBtn1");
// console.log(quantity1.value);
// sendButton1.addEventListener('click', addToBuyCart(1, quantity1.value));
// console.log(carrito);

//Creo la funcion agregar al carrito
//si id no esta incluido al array se agrega en la ultima posicion
//si el id ya se eligio actualizo la cantidad del item en el array

function addToBuyCart(id, cant) {

    const result = carrito.find(Producto => Producto.id == id);
    if (result == undefined || carrito == []) {
        carrito.push(almacen.find(Producto => Producto.id == id));
        carrito[carrito.length - 1].cantidad = cant;
        carrito[carrito.length - 1].updateStock = cant;
    } else {
        console.log("esta el id");
        for (let i = 0; i < carrito.length; i++) {
            if (carrito[i].id == id) {
                carrito[i].cantidad = carrito[i].cantidad + cant;
                carrito[i].updateStock = cant;
            }
        }
    }
    console.log("Lista de productos en carrito :", carrito);

    //Agrego al badge la cantidad total de items
    let cartTotalDesktop = document.getElementById('lblCartCountDesktop');
    let cartTotalMobile = document.getElementById('lblCartCountMobile');
    newValue = document.createTextNode(totalQuantity(carrito));
    console.log("En el carrito hay este nro de items :", newValue);
    console.log(cartTotalDesktop);
    cartTotalDesktop.textContent = String(totalQuantity(carrito));
    cartTotalMobile.textContent = String(totalQuantity(carrito));

    if (carrito.length > 0) {
        document.getElementById('lblCartCountMobile').style.display = "block";
        document.getElementById('lblCartCountDesktop').style.display = "block";
    }
}


//Recorro el array carrito para calcular la cantidad de items elegidos

function totalQuantity(carrito) {
    let totalItems = 0;
    for (const item of carrito) {
        totalItems = totalItems + parseInt(item.cantidad);
    }
    console.log(totalItems);
    return (totalItems);
}

//Almaceno en el storage el contenido del carrito
localStorage.setItem('productosCarrito', JSON.stringify(carrito));
console.log(window.localStorage.length);

//Pruebo obtener un array con todos los nros de cantidades capturada
//desde los productos
const arrayBtnBuy = document.querySelectorAll('[data-id]');
console.log(arrayBtnBuy);
console.log(arrayBtnBuy.length);
// const agregarAlCarrito = (e) => {
//     id = (e.target.dataset.id);
//     console.log("el id es el siguiente", id);
// }
// arrayBtnBuy.forEach((btn) => addEventListener("click", agregarAlCarrito));

//Pruebo de forma mas reducida capturar los productos y cantidades
// arrayBtnBuy.forEach((btn) => addEventListener("click", (e) => {
//     id = (e.target.dataset.id);
//     console.log("El ID es : ", id);
//     idString = "" + id + "";
//     idString = "quantityBtn" + idString;
//     console.log("el id a buscar es ", idString);

//     const quantity = document.getElementById([idString]);
//     console.log("El valor de quantity es :", quantity.value);
//     quantity.addEventListener('change', addToBuyCart(id, parseInt(quantity.value)));
// }));

//$('.card1').fadeIn("slow");
$('#sendBtn1').on('click', (e) => {
    $('#image1').css('border', 'solid');
});