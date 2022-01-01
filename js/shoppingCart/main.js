//Creo la clase Producto

class Producto {
    constructor(nombre, precio, id, cantidad, stock) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.id = parseInt(id);
        this.cantidad = parseInt(cantidad);
        this.stock = parseInt(stock);
        this.vendido = false;
        const factorIVA = Math.round(parseFloat(1.21 * 100)) / 100;
        this.valorTotal = (this.precio * factorIVA * 100).toFixed(2);
        this.precioFinal = Math.round(this.valorTotal * cantidad * 100) / 100;
    }
    valorFinal() {
        this.precioFinal;
    }
    sumarIva() {
        this.precio = this.precio * factorIVA;
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

//Cargo en el array almacen la lista de mis productos
//usar estas lineas de codigo en el caso de no hacer uso de AJAX
// almacen.push(new Producto("cable adaptador cpu fuente", 450.00, 1, 0, 20));
// almacen.push(new Producto("riser adaptador 1x a 16x", 1200.99, 2, 0, 20));
// almacen.push(new Producto("riser adaptador multiple", 6200.99, 3, 0, 20));
// almacen.push(new Producto("breakout board 12 salidas", 2200.99, 4, 0, 20));
// almacen.push(new Producto("fuente servidor 1400w", 40200, 5, 0, 20));
// almacen.push(new Producto("estructura de rig para 5 gpus", 11200, 6, 0, 20));
// almacen.push(new Producto("rig de mineria 7 gpus", 1120000, 7, 0, 20));
// almacen.push(new Producto("rig de mineria 7 gpus", 1304000, 8, 0, 20));
// almacen.push(new Producto("rig de mineria 7 gpus", 1650000, 9, 0, 20));


// //Almaceno en el storage el contenido del alamacen
// localStorage.setItem('productosAlmacen', JSON.stringify(almacen));
// console.log(window.localStorage.length);


//Hago uso de AJAX para traer del archivo prod.json los articulos y luego
//cargarlos en el array almacen
function loadStore() {

    $.getJSON('./prod.json', (respuesta, status) => {
        if (status === 'success') {
            //console.log("Almacen contiene :", respuesta);
            respuesta.forEach((prod) => {
                almacen.push(prod);
            });
        };
    });
    console.log("Array almacen AJAX", almacen);
}

loadStore();

//Compruebo por consola contenidos en arrays almacen y carrito

// console.log(almacen);
// console.log(almacen[0]);
// console.log(carrito);

//Creo la funcion para actualizar el stock del almacen

function updateStore(id, quantity) {

    const index = almacen.findIndex((item) => item.id == id);
    if (quantity <= almacen[index].stock) {
        //almacen[index].updateStock = quantity;
        almacen[index].cantidad = almacen[index].cantidad + quantity;
        almacen[index].stock = almacen[index].stock - quantity;
        //console.log("el almacen tiene este stock", almacen[index].stock);
    } else {
        quantity = almacen[index].stock;
        almacen[index].stock = almacen[index].stock - quantity;
        almacen[index].cantidad = almacen[index].cantidad + quantity;
    };
}


//Capturo los eventos en cada boton "Agregar al carrito"
//y en el numero seleccionado de cantidad de items.
//Creo la funcion addToBuyCart para agregar al carrito.
//Pregunto si id esta incluido al carrito, se agrega en la ultima posicion
//si el id ya estaba, actualizo la cantidad del item en el array.

function addToBuyCart(id, cant) {
    var maxCant = cant;
    if (cant > 0) {
        const result = carrito.find(Producto => Producto.id == id);
        if (result == undefined || carrito == []) {
            carrito.push(almacen.find(Producto => Producto.id == id));
            carrito[carrito.length - 1].cantidad = cant;
            carrito[carrito.length - 1].updateStock = cant;
            carrito[carrito.length - 1].stock = carrito[carrito.length - 1].stock - cant;
            carrito[carrito.length - 1].valorFinal;
        } else {
            //console.log("esta el id");
            for (let i = 0; i < carrito.length; i++) {
                if (carrito[i].id == id && ((carrito[i].stock) > 0)) {
                    if (cant > carrito[i].stock) {
                        cant = carrito[i].stock;
                        carrito[i].cantidad = carrito[i].cantidad + cant;
                        carrito[i].updateStock = cant;
                    } else {
                        carrito[i].cantidad = carrito[i].cantidad + cant;
                        carrito[i].updateStock = cant;
                    }
                }
            }
        }
        console.log("Lista de productos en carrito :", carrito);

        //Agrego al badge la cantidad total de items
        addToBadge(carrito);

        //Guardo en localStorage para acceder a los items luego, desde 
        //la seccion finalizarCompra
        localStorage.setItem('productosCarrito', JSON.stringify(carrito));
        console.log(window.localStorage.length);

        //Modifico la leyenda del boton "Agregar al carrito" si no tengo stock
        changeBtnText(id);

        //Remarco la imagen del producto seleccionado
        remarkProduct(id);

        //Actualizo el stock de los productos en almacen
        updateStore(id, maxCant);

        //Almaceno en el storage el contenido del alamacen
        localStorage.setItem('productosAlmacen', JSON.stringify(almacen));
        console.log(window.localStorage.length);

    }
}

//Creo la funcion para actualizar el stock del almacen

// function updateStore(id, quantity) {
//     console.log("ACTUALIZO");
//     const index = almacen.findIndex((item) => item.id == id);
//     console.log("El indice es ", index);
//     console.log("el almacen tiene este stock", almacen[index].stock);
//     if (quantity <= almacen[index].stock) {
//         almacen[index].stock = almacen[index].stock - quantity;
//         console.log("el almacen tiene este stock", almacen[index].stock);
//     } else {
//         quantity = almacen[index].stock;
//         almacen[index].stock = almacen[index].stock - quantity;
//         almacen[index].cantidad = almacen[index].cantidad + quantity;
//     };
// }

//Modifico la leyenda del boton "Agregar al carrito" si no tengo stock

function changeBtnText(id) {
    const prodItem = carrito.find(Producto => Producto.id == id);
    if (prodItem.stock == 0) {
        idBtn = "sendBtn" + id;
        //console.log("EL ID DE BOTON ES :", idBtn);
        $("#" + idBtn).html('Producto Sin Stock');
    }
}

//Agrego al badge la cantidad total de items

function addToBadge(arrayCart) {
    let cartTotalDesktop = document.getElementById('lblCartCountDesktop');
    let cartTotalMobile = document.getElementById('lblCartCountMobile');
    newValue = document.createTextNode(totalQuantity(arrayCart));
    console.log("En el carrito hay este nro de items :", newValue);
    console.log(cartTotalDesktop);
    cartTotalDesktop.textContent = String(totalQuantity(arrayCart));
    cartTotalMobile.textContent = String(totalQuantity(arrayCart));

    if (arrayCart.length > 0) {
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
    //console.log(totalItems);
    return (totalItems);
}

//Funcion para remarcar el producto elegido de la tienda

function remarkProduct(id) {
    let btnId = "sendBtn" + id;
    let imgId = "image" + id;
    $('#' + imgId).css({ 'border': 'solid', 'color': '#353333' });
}

//Obtengo un array con todos los valores de cantidades capturadas
//desde los productos en la tienda y luego proceso la cantidad seleccionada
//usando addTuBuyCart

const arrayBtnBuy = document.querySelectorAll('[data-id]');
arrayBtnBuy.forEach((btn) => btn.addEventListener("click", (e) => {
    id = (e.target.dataset.id);
    //console.log("El ID es : ", id);
    idString = "quantityBtn" + id;
    //console.log("el id a buscar es ", idString);

    const quantity = document.getElementById([idString]);
    //console.log("El valor de quantity es :", quantity.value);
    quantity.addEventListener('change', addToBuyCart(id, parseInt(quantity.value)));
}));