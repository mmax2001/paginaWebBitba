//Declaro la clase Producto
class Producto {
    constructor(nombre, precio, id, cantidad, stock) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.id = parseInt(id);
        this.cantidad = parseInt(cantidad);
        this.stock = parseInt(stock);
        this.vendido = false;
        const factorIVA = parseFloat(1.21);
        this.valorTotal = this.precio * factorIVA;
        this.precioFinal = this.valorTotal * cantidad;
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

const carrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];
console.log("el carrito es :", carrito);
var items = carrito.map((producto) => (new Producto(producto.nombre, producto.precio, producto.id, producto.cantidad, producto.stock)));
console.log(items);

const listCart = document.getElementById("carrito");
const template = document.getElementById("template");
//const templeteEndBuy = document.getElementById("templateEndBuy");
const templateFooter = document.getElementById("templateFooter");
const finalPrice = document.getElementById("finalPrice");
const footer = document.querySelector("footer");
const fragment = document.createDocumentFragment();

document.addEventListener("click", (e) => {


    // console.log(e.target.matches(".list-group-item .btn-success"));
    if (e.target.matches(".list-group-item .btn-success")) {
        btnAumentar(e);
    }

    // console.log(e.target.matches(".list-group-item .btn-danger"));
    if (e.target.matches(".list-group-item .btn-danger")) {
        btnDisminuir(e);
    }
});


const generateFinalPrice = () => {
    footer.textContent = "";
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        console.log(items[i]);
        total = total + items[i].valorTotal * items[i].cantidad;
    };
    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("p span").textContent = total;

    // fragment.appendChild(clone);
    footer.appendChild(clone);

}

const generateCart = () => {
    listCart.textContent = "";
    items.forEach((item) => {
        console.log("ESTE ES EL ELEMENTO:", item);
        const clone = template.content.cloneNode(true);
        clone.querySelector(".text-white .lead").textContent = item.nombre;
        clone.querySelector(".rounded-pill").textContent = item.cantidad;
        clone.querySelector("div .lead span").textContent = item.valorTotal * item.cantidad;
        clone.querySelector(".btn-success").dataset.id = item.id;
        clone.querySelector(".btn-danger").dataset.id = item.id;
        fragment.appendChild(clone);
    });
    listCart.appendChild(fragment);
    generateFinalPrice();
};

generateCart();

const btnAumentar = (e) => {
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

const btnDisminuir = (e) => {
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


for (const producto of carrito) {
    //Por cada producto además de los datos agregamos un botón 
    $(".container-p").append(`<div>
                        <input value="${producto.id}" type="hidden">
                        <h4>  Producto:${producto.cantidad} - ${producto.nombre}</h4>
                        <b> $ ${producto.precio}</b>
                        <button class="btn btn-primary btn-sm mr-1 my-1">Comprar</button>
                    </div>`);
};

$('#mostrarStock').on('click', (e) => {
    $.getJSON('prod.json', (respuesta, status) => {
        if (status === 'success') {
            respuesta.forEach((prod) => {
                $('.container').append(`${prod.nombre}-${prod.cantidad}<br>`);
            });
        };
    });
});

const api = 'piv2.bitcoinaverage.com/indices/local/ticker/short?crypto=BTC&fiat=USD'
$.get(api, p => {
    document.querySelector('#pre').textContent = JSON.stringify(p, null, 2)
});