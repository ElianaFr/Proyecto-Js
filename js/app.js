let arrayCarrito = [];
let stock = [];

const cajaProductos = document.getElementById('caja-productos');
const cajaCarrito = document.getElementById('caja-carrito');


const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');
const selecNivel = document.getElementById('selecNivel');


function cargarJson(){
    fetch("../prod.json")
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            data.forEach(element =>{
                stock.push(element)
            })
        })
}

cargarJson()
console.log(stock)




listadoProductos(stock);

function listadoProductos(array){
    cajaProductos.innerHTML= ""
    //por cada producto que tengo en el array declarado de stock se crea un bloque 
    array.forEach(item => {
        let div = document.createElement('div')
        div.className = 'row justify-content-center m-2 '
    div.innerHTML += `
    <div class="row justify-content-center m-4">
        <div class="col-md-12 col-xl-10">
            <div  class="card shadow-6 border rounded-3 p-4" >
                <div class="row">
                    <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                        <div class="bg-image">
                            <img src=${item.img} class=" w-100 border rounded-2">
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-6">
                        <h5>Pack de 10 posiciones- ${item.nivel}</h5>
                        <div class="d-flex flex-row">
                            <div  class=" mb-1 me-2">
                                <i class="bi bi-star-fill text-black"></i>
                                <i class="bi bi-star-fill text-black"></i>
                                <i class="bi bi-star-fill text-black"></i>
                                <i class="bi bi-star-fill text-black"></i>
                            </div>
                            <div>
                                <span>${item.opinion}</span>
                            </div>
                        </div>
                        <div class="mt-1 mb-0 text-muted small">
                            <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, veniam!
                            Lorem, ipsum dolor sit amet consectetu.                                           
                            </p>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                        <div class="d-flex flex-row align-items-center mb-1">
                            <h4 class="mb-1 me-1">$${item.precio}.-</h4>
                            <span class="text-danger"><s>$ ${item.precioBase}.-</s></span>
                        </div>
                        <h6 class="text-success">Disponible en todas las plataformas</h6>
                        <div class="d-flex flex-column mt-4">
                            <button id="agregar${item.id}" class="btn btn-primary btn" type="button">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>        
    `
    cajaProductos.appendChild(div)
        //capturo el evento, el id del producto
        let botonAgregar = document.getElementById(`agregar${item.id}`)
        botonAgregar.addEventListener('click',()=>{
            agregarProducto(item.id)
        })
    })
}

function agregarProducto(id) {
    //busca si existe el producto y entra al bucle
    let prodExiste = arrayCarrito.find(item=> item.id == id)
    if(prodExiste){ //si existe agrega 1 y modifica el html
        prodExiste.cantidad = prodExiste.cantidad + 1
        document.getElementById(`cantidad-${prodExiste.id}`).innerHTML =` <p id="cantidad-${prodExiste.id}">Cantidad: ${prodExiste.cantidad}   </p>`
        //actualizo el carrito
        actualizarCarrito()

    }else{

    let productoElegido = stock.find(elemento => elemento.id == id)
    productoElegido.cantidad = 1
    arrayCarrito.push(productoElegido)
    actualizarCarrito()
    resumenCarrito(productoElegido)
    }
}

function resumenCarrito(productoElegido) {
    let div = document.createElement('div')
    div.className = 'productoEncarrito'
    div.innerHTML += `
                    <p>Cantidad de posiciones ${productoElegido.posiciones}</p>
                    <p>Nivel ${productoElegido.nivel} </p>  
                    <p>Precio: $${productoElegido.precio}</p>
                    <p id="cantidad-${productoElegido.id}">Cantidad: ${productoElegido.cantidad}   </p>
                    <button id= "eliminar-${productoElegido.id}" class="boton-eliminar"><i class="bi bi-trash3"></i></button>
                    <hr class="mt-0" >
    `
    cajaCarrito.appendChild(div)
    
    //eliminar un articulo
    let botonEliminar = document.getElementById(`eliminar-${productoElegido.id}`)
        botonEliminar.addEventListener('click',()=> {
            
            // console.log(productoElegido.id)
            // console.log(botonEliminar.parentElement)
            // botonEliminar.parentElement.remove()
            // arrayCarrito = arrayCarrito.filter(item => item.id!= productoElegido.id)
            // // console.log(arrayCarrito)
            // actualizarCarrito()


        if(productoElegido.cantidad == 1){

            botonEliminar.parentElement.remove()
            arrayCarrito = arrayCarrito.filter(item=> item.id != productoElegido.id)
            actualizarCarrito()
            Swal.fire({
                title: 'Aviso',
                text: 'ARTICULO BORRADO CORRECTAMENTE',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            
            localStorage.setItem('arrayCarrito',JSON.stringify(arrayCarrito))

        }else{
            productoElegido.cantidad = productoElegido.cantidad - 1
            document.getElementById(`cantidad-${productoElegido.id}`).innerHTML =` <p id="cantidad-${productoElegido.id}">Cantidad: ${productoElegido.cantidad}   </p>`
            actualizarCarrito()
            Swal.fire({
                title: 'Aviso',
                text: 'ARTICULO BORRADO CORRECTAMENTE',
                icon: 'success',
                confirmButtonText: 'OK'
              })
            localStorage.setItem('arrayCarrito',JSON.stringify(arrayCarrito))
            }
        

    })
    localStorage.setItem('arrayCarrito',JSON.stringify(arrayCarrito))

}

function actualizarCarrito(){
    contadorCarrito.innerText = arrayCarrito.reduce((acc,elemento)=> acc + elemento.cantidad,0)
    precioTotal.innerText= arrayCarrito.reduce((acc,elemento)=> acc + (elemento.precio *elemento.cantidad),0)

}

function recuperar(){
    let recuperarDatos = JSON.parse(localStorage.getItem('arrayCarrito'))
    if(recuperarDatos){
        recuperarDatos.forEach(el=>{
            resumenCarrito(el)
            arrayCarrito.push(el)
            actualizarCarrito()

        }
            
        )}
}

recuperar()


//buscar producto

selecNivel.addEventListener('change',()=>{
    if(selecNivel.value =='todos' ){
        listadoProductos(stock)
    }else{
        listadoProductos(stock.filter(elemento => elemento.nivel ==selecNivel.value))
    }
})


