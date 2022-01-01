//Declaro la clase Producto
class Producto {
    constructor(nombre, precio, id, cantidad, stock) {
        this.nombre = nombre;
        this.precio = (parseFloat(precio)).toFixed(2);
        this.id = parseInt(id);
        this.cantidad = parseInt(cantidad);
        this.stock = parseInt(stock);
        this.vendido = false;
        const factorIVA = Math.round(parseFloat(1.21 * 100)) / 100;
        this.valorTotal = (this.precio * factorIVA).toFixed(2);
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

//Traigo del local storage los productos que tengo en el carrito
const carrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];
console.log("el carrito es :", carrito);
var items = carrito.map((producto) => (new Producto(producto.nombre, producto.precio, producto.id, producto.cantidad, producto.stock)));
console.log(items);

//Declaro constantes referidas los id que luego modificare el contenido
const listCart = document.getElementById("carrito");
const template = document.getElementById("template");
const templateFooter = document.getElementById("templateFooter");
const finalPrice = document.getElementById("finalPrice");
const footer = document.querySelector("footer");
const fragment = document.createDocumentFragment();

//Capturo los clicks en los botones incrementar y decrementar
document.addEventListener("click", (e) => {

    // console.log(e.target.matches(".list-group-item .btn-success"));
    if (e.target.matches(".list-group-item .btn-success")) {
        btnIncrementar(e);
    }

    // console.log(e.target.matches(".list-group-item .btn-danger"));
    if (e.target.matches(".list-group-item .btn-danger")) {
        btnDecrementar(e);
    }
});

//Genero la funcion para el calculo del precio total de los items comprados
const generateFinalPrice = () => {
    footer.textContent = "";
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        console.log(items[i]);
        total = total + items[i].valorTotal * items[i].cantidad;
    };
    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("p span").textContent = total.toFixed(2);

    // fragment.appendChild(clone);
    footer.appendChild(clone);

}

//Genero la funcion para mostrar contenido en la lista de items comprados
const generateCart = () => {
    listCart.textContent = "";
    items.forEach((item) => {
        console.log("ESTE ES EL ELEMENTO:", item);
        const clone = template.content.cloneNode(true);
        clone.querySelector(".text-white .lead").textContent = item.nombre;
        clone.querySelector(".rounded-pill").textContent = item.cantidad;
        clone.querySelector("div .lead span").textContent = (item.valorTotal * item.cantidad).toFixed(2);
        clone.querySelector(".btn-success").dataset.id = item.id;
        clone.querySelector(".btn-danger").dataset.id = item.id;
        fragment.appendChild(clone);
    });
    listCart.appendChild(fragment);
    generateFinalPrice();
};

generateCart();

//Genero la funcion para incrementar unidades de items
const btnIncrementar = (e) => {
    //console.log(e.target.dataset.id);
    items = items.map((item) => {
        if (item.id == e.target.dataset.id) {
            item.cantidad++;
            console.log("ESTE ES EL ITEM", item);
        }
        return item;
    });
    generateCart();
};

//Genero la funcion para decrementar unidades de items
const btnDecrementar = (e) => {
    // console.log(e.target.dataset.id);
    items = items.filter((item) => {
        // console.log(item);
        if (item.id == e.target.dataset.id) {
            if (item.cantidad > 0) {
                item.cantidad--;
                // console.log(item);
                if (item.cantidad === 0) return;
                return item;
            }
        } else {
            return item;
        }
    });
    generateCart();
};

//Genero el modal para mostrar finalizacion del proceso de compra
if (document.getElementById("btnModal")) {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("btnModal");
    var span = document.getElementsByClassName("close")[0];
    var body = document.getElementsByTagName("body")[0];

    btn.onclick = function() {
        modal.style.display = "block";

        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
    }

    span.onclick = function() {
        modal.style.display = "none";

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";

            body.style.position = "inherit";
            body.style.height = "auto";
            body.style.overflow = "visible";
        }
    }
}

//Muestro el contenido de almacen 
const almacenStock = JSON.parse(localStorage.getItem('productosAlmacen'));
var itemsAlmacen = almacenStock.map((producto) => (new Producto(producto.nombre, producto.precio, producto.id, producto.cantidad, producto.stock)));
console.log(itemsAlmacen);
$('#mostrarStock').on('click', (e) => {
    itemsAlmacen.forEach((prod) => {
        $('#tableStock').append(`<br>Producto : ${prod.nombre} - Unidades Disponibles :${prod.stock}<br><br>`);
    });
});


//Obtengo cotizacion BTC#1
var settings = {
    "url": "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT",
    "method": "GET",
    "timeout": 0,
};

$.ajax(settings).done(function(response) {
    console.log(response);
});

//Obtengo cotizacion BTC#2
fetch('https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT')
    .then(r => r.json()
        .then(j => document.querySelector('#pre').textContent = "Precio BTC : USD " + parseFloat(btcPrice = j.price).toFixed(2)));