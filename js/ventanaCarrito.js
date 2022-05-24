const ventanaAbrir = document.getElementById('boton-open')
const ventanaCerrar = document.getElementById('boton-cerrar')
const ventanaContenedor = document.getElementById('modal-contenedor')
const ventanaCarrito= document.getElementById('modal-carrito')
const btnComprar = document.getElementById('btnComprar')


if (document.title === "Yoga Pocket-Clases") {

    ventanaCerrar.addEventListener("click", () => {

        ventanaContenedor.classList.toggle("modal-active");

    });
}
if (document.title === "Yoga Pocket-Clases") {

    ventanaAbrir.addEventListener('click', ()=> {
        ventanaContenedor.classList.toggle('modal-active')
    })
    
}

btnComprar.addEventListener('click', ()=>{
    location.href="pago.html"
})