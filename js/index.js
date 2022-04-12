//declaro un array vacio para el carrito de compras y variables que voy a usar
let nombreUsuario;
let arrayCarrito = [];
let precioCompra;
let compraUsuario;

// creo el objeto que voy a tener en el array Carrito

class Productos {
    constructor (packs){
        this.id = packs.id;
        this.nivel = packs.nivel;
        this.posiciones = packs.posiciones;
        this.cantidad = 1;
        this.precio = packs.precio;
    }
}

// declaro el array que tengo de base

const arrayProductos = [
    {
        id: 0,
        nivel: "INICIAL",
        posiciones: 10,
        precio: 1500
    },
    {
        id: 1,
        nivel: "MEDIO",
        posiciones: 10,
        precio: 2000
    },
    {
        id: 2,
        nivel: "EXPERTO",
        posiciones: 10,
        precio: 3000
    }
]
console.log(arrayProductos);



//se genera la funcion para que ingrese el nombre
const presentacion = ()=>{
    alert("Estas iniciando la compra en Yoga Pocket")
    nombreUsuario = prompt("Por favor para iniciar la compra ingresa tu nombre ")
        while(nombreUsuario === ""|| !isNaN(parseInt(nombreUsuario))){
            nombreUsuario = prompt("Por favor ingresa tu nombre")
    }
}

// opciones al usuario de los articulos del arrayProductos
const opciones = () =>{
    let eleccion = "";
    for (const articulos of arrayProductos) {
        eleccion += `${articulos.id}) nivel ${articulos.nivel} cantidad de posiciones ${articulos.posiciones} precio $ ${articulos.precio}\n`;
    }
    let datoUsuario = parseInt(prompt(`Estas eligiendo posiciones de yoga, por favor selecciona la que desees:\n ${eleccion}`));

    while(datoUsuario < 0  || datoUsuario > 2 || isNaN(datoUsuario)){
        datoUsuario = parseInt(prompt(`Estas eligiendo posiciones de yoga, por favor selecciona la que desees:\n ${eleccion}`));
    }
    return datoUsuario
}
// funcion para comprobar si ya existe en el carrito
const seleccionUsuario =() => {
    //busco el objeto que el usuario quiere comprar
    let resultadoProducto = arrayProductos.find(
        (elemento) => elemento.id === compraUsuario
    );
    //busca si esta el articulo repetido
    let cantidadRepetida = arrayCarrito.some(elemento => elemento.id === compraUsuario)
    if (cantidadRepetida){
        resultadoProducto.cantidad++;
    }else{
        resultadoProducto.cantidad = 1;
        arrayCarrito.push(resultadoProducto)    
    }
    console.log(arrayCarrito)
    let continuar = confirm("¿Desea continuar con su compra?");
    console.log(continuar);
    if(continuar === true){
        compraUsuario = opciones();
        seleccionUsuario();
    }
};
// funcion para calcular el precio de la compra
const montoCarrito = () =>{
    let precioTotal = 0
    for(const productos of arrayCarrito){
        precioTotal = (productos.precio * productos.cantidad) + precioTotal;
    }
    return precioTotal
}
//funcion para saber que forma de pago hay disponible
const formaDePago = ()=>{
    let pago = parseInt(prompt(`Por favor seleccione la forma de pago:\n
    1- Transferencia Bancaria\n
    2- Tarjeta de Credito `));
    
    if (pago == 1 || pago == 2) {
        if (pago == 1){
            document.write(` El monto a pagar por transferencia es $ ${precioCompra}.-`)
        }else {
            if (pago == 2){
                let cuotas = parseInt(prompt(`Por favor seleccione la cantidad de cuotas:\n
                1- 3 cuotas 10% de interes\n
                2- 6 cuotas 20% de interes\n
                3- 12 cuotas 40% de interes`));
                
                if (cuotas == 1){
                    let precioTresCuotas = precioCompra * 1.10;
                    let precioPorCuota = precioTresCuotas / 3;
                    document.write(`El monto total a pagar en 3 cuotas es $ ${precioTresCuotas}. Precio por cuota $ ${precioPorCuota}.- `)
                }else{
                    if (cuotas == 2){
                        let precioSeisCuotas = precioCompra * 1.20;
                        let precioPorCuota = precioSeisCuotas / 6;
                        document.write(`El monto total a pagar en 6 cuotas es $ ${precioSeisCuotas}. Monto por cuota $ ${precioPorCuota}.- `)
                    } else {
                        if(cuotas == 3){
                            let precioDoceCuotas = precioCompra * 1.40;
                            let precioPorCuota = precioDoceCuotas / 12;
                            document.write(`El monto total a pagar en 12 cuotas es $ ${precioDoceCuotas}. Monto por cuota $ ${precioPorCuota}.- `)
                        }else{
                            alert ("Por favor ingresa una de las opciones disponibles")
                            formaDePago()
                        }
                    }
                }
            }
        }
    }else {
            alert ("Por favor ingresa una forma de pago correcto")
            formaDePago()
        }
}

// se crea un nuevo array con los precios correspondiente al pago con tarjeta en 3 cuotas

const arrayTarjeta = arrayProductos.map((elemento)=>{
    return {
        id: elemento.id,
        nivel: elemento.nivel,
        posiciones: elemento.posiciones,
        precio: elemento.precio * 1.10
    }
});




//llamo a las funciones

presentacion();
compraUsuario = opciones();
seleccionUsuario();
precioCompra = montoCarrito()
console.log(precioCompra)
document.write(`${nombreUsuario} muchas gracias por tu compra.\n`)
formaDePago();
console.log(arrayTarjeta)
