const ventanaAbrir = document.getElementById('boton-open')
const ventanaCerrar = document.getElementById('boton-cerrar')

const ventanaContenedor = document.getElementById('modal-contenedor')
const ventanaCarrito= document.getElementById('modal-carrito')

ventanaAbrir.addEventListener('click', ()=> {
    ventanaContenedor.classList.toggle('modal-active')
})
ventanaCerrar.addEventListener('click', ()=> {
    ventanaContenedor.classList.toggle('modal-active')
})
