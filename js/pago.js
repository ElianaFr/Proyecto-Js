// pagos
//cargar compra
const arrayCompra=[];
const listadoCompra= document.getElementById('listadoCompra')

function cargarCarrito(){
    let cargaCarrito = JSON.parse(localStorage.getItem('arrayCarrito'));
    if(cargaCarrito){
        cargaCarrito.forEach (el=>{
            arrayCompra.push(el)
        });
    }
    
}
cargarCarrito()
console.log(arrayCompra)

// resumen de la compra
function listadoProductos(array){
    // listadoCompra.innerHTML=""
    array.forEach(item =>{
        
        let div =document.createElement('div')
            div.className = 'row justify-content-center m-2'

        div.innerHTML += `
        <div class="row justify-content-center m-4">
        <div class="col-md-12 col-xl-10">
            <div  class="card shadow-6 border rounded-3 p-3" >
                <div class="row">
                    <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                        <div class="bg-image">
                            <img src=${item.img} class=" w-100 border rounded-2">
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-6 ">
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
                                                    </div>
                        <h6 class="text-success">Disponible en todas las plataformas</h6>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
        
        
        
        `
        listadoCompra.appendChild(div)
        
        
    })

}
if (document.title === "Pago") {

    listadoProductos(arrayCompra);

}






//---------------variables para trabajar con formulario envio---------
const formEnvio = document.querySelector('#formEnvio');
const inputs = document.querySelectorAll('#formEnvio input');


//---------------- variables para trabajar con la tarjeta-----------
const btnAbrirForm = document.querySelector('#btn-abrir-form');
const formTarjeta = document.querySelector('#form-tarjeta');
const numeroTarj = document.querySelector('#tarjeta .numero');
const titularTarj = document.querySelector('#tarjeta .titular');
const logoMarca = document.querySelector('#logoMarca');
const expMes= document.querySelector('#tarjeta #expiracion .mes');
const expYear= document.querySelector('#tarjeta #expiracion .year');
const ccv = document.querySelector('#tarjeta .codigo');

// variable para trabajar con el boton pagar
const btnPagar = document.querySelector('#formEnvio #btnPagar');



//---------------------formulario envio----------------------- 
//objeto para validar formulario envio

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	direccion: /^[a-zA-Z0-9\s]{4,16}$/, // Letras, numeros, espacio
    password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    codigo: /^\d{4}$/, // .
}

//objeto para validar que todos los inputs estan completos
const campos={
    nombre: false,
    apellido: false,
    correo: false,
    password: false,
    direccion: false,
    localidad: false,
    codigo: false,
}

// ----------------------verificar los datos ingresados --------------------------



//funcion para validar


const validarFormulario = (e)=>{
    switch (e.target.name){
        case "nombre":
            if(expresiones.nombre.test(e.target.value)){
                document.querySelector('.formulario__nombre-error').classList.remove('formulario__nombre-error-activo')
            campos['nombre'] = true;
            }else{
                document.querySelector('.formulario__nombre-error').classList.add('formulario__nombre-error-activo')
                campos['nombre'] = false;
            }



            break;
        
        case "apellido":
            if(expresiones.nombre.test(e.target.value)){
                document.querySelector('.formulario__apellido-error').classList.remove('formulario__apellido-error-activo')
                campos['apellido'] = true;
            }else{
                document.querySelector('.formulario__apellido-error').classList.add('formulario__apellido-error-activo')
                campos['apellido'] = false;
            }

            break;
        
        case "correo":
            
            if(expresiones.correo.test(e.target.value)){
                
                document.querySelector('.formulario__input-error').classList.remove('formulario__input-error-activo')
                campos['correo'] = true;
            }else{
                document.querySelector('.formulario__input-error').classList.add('formulario__input-error-activo')
                campos['correo'] = true;
            }


            break;
    
        case "password":
            if(expresiones.password.test(e.target.value)){
                
                document.querySelector('.formulario__password-error').classList.remove('formulario__password-error-activo')
                campos['password'] = true;
            }else{
                document.querySelector('.formulario__password-error').classList.add('formulario__password-error-activo')
                campos['password'] = false;
            }

            break;
        
        case "direccion":
            if(expresiones.direccion.test(e.target.value)){
                
                document.querySelector('.formulario__direccion-error').classList.remove('formulario__direccion-error-activo')
                campos['direccion'] = true;
            }else{
                document.querySelector('.formulario__direccion-error').classList.add('formulario__direccion-error-activo')
                campos['direccion'] = false;
            }
break;
    
        case "localidad":
            if(expresiones.nombre.test(e.target.value)){
                
                document.querySelector('.formulario__localidad-error').classList.remove('formulario__localidad-error-activo')
                campos['localidad'] = true;

            }else{
                document.querySelector('.formulario__localidad-error').classList.add('formulario__localidad-error-activo')
                campos['localidad'] = false;

            }
            break;
        
        case "cp":
            if(expresiones.codigo.test(e.target.value)){
                
                document.querySelector('.formulario__Cp-error').classList.remove('formulario__Cp-error-activo')
                campos['codigo'] = true;

            }else{
                document.querySelector('.formulario__Cp-error').classList.add('formulario__Cp-error-activo')
                campos['codigo'] = false;

            }
            break;
        
    }
}




inputs.forEach((input)=> {
    input.addEventListener('keyup',validarFormulario);
    input.addEventListener('blur',validarFormulario);
    

    
});

//para verificar si estan completos todos los campos

formEnvio.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(campos.nombre && campos.apellido && campos.correo && campos.password && campos.direccion && campos.localidad && campos.codigo){
        document.getElementById('formulario__msj-correcto').classList.add('formulario__msj-correcto-activo');
        setTimeout(()=>{
            document.getElementById('formulario__msj-correcto').classList.remove('formulario__msj-correcto-activo');
        },5000) 
    }
    else{
        document.getElementById('formularioTxtError').classList.add('formularioTxtError-activo');
        setTimeout(()=>{
            document.getElementById('formularioTxtError').classList.remove('formularioTxtError-activo');
        },5000) 
        
    }
});



//input nombre 

nombreEnvio.addEventListener('keyup', (e)=>{
    let inputNombre = e.target.value
    //para que solo pueda escribir letras

    nombreEnvio.value = inputNombre
    .replace(/[0-9]/g,'')
    //eliminar los espacios en blanco
    .replace(/\s/g,'');
    
});
//input apellido 
apellidoEnvio.addEventListener('keyup', (e)=>{
    let inputApellido = e.target.value
    //para que solo pueda escribir letras
    apellidoEnvio.value = inputApellido.replace(/[0-9]/g,'')
    //eliminar los espacios en blanco
    .replace(/\s/g,'');
    
});
//input localidad
inputLoc.addEventListener('keyup', (e)=>{
    let inputLocalidad = e.target.value
    //para que solo pueda escribir letras

    inputLoc.value = inputLocalidad.replace(/[0-9]/g,'')
    //eliminar los espacios en blanco
    .replace(/\s/g,'');
    
});
//input codigo postal

inputPostal.addEventListener('keyup', (e)=>{
    let inputCD = e.target.value
    //para que solo pueda escribir numeros

    inputPostal.value = inputCD
    //eliminar letras
    .replace(/\D/g,'')
    //eliminar los espacios en blanco
    .replace(/\s/g,'');
    
});




//*************************************formulario tarjeta*******************************


// boton de abrir formulario tarjeta 

btnAbrirForm.addEventListener('click', () =>{
    btnAbrirForm.classList.toggle('active')
    formTarjeta.classList.toggle('active')
} );

// relleno select mes y año tarjeta

for(let i =1; i<=12; i++){
    let opcion = document.createElement('option');
    opcion.value= i;
    opcion.innerText = i;
    formTarjeta.selectMes.appendChild(opcion);
}

// relleno año tarjeta
const yearActual = new Date().getFullYear();
for(let i= yearActual; i<= yearActual+10; i++ ){
    let opcion = document.createElement('option');
    opcion.value= i;
    opcion.innerText = i;
    formTarjeta.selectYear.appendChild(opcion);
}


// input numero de tarjeta

formTarjeta.inputNumero.addEventListener('keyup',(e)=>{
    let valorInput = e.target.value;

    formTarjeta.inputNumero.value = valorInput
    //eliminar los espacios en blanco
    .replace(/\s/g,'')
    //eliminar letras
    .replace(/\D/g,'')
    //espacio entre numero de tarjeta
    .replace(/([0-9]{4})/g,'$1 ')
    //elimina el ultimo espacio
    .trim()
    
    //ponerlo dentro de la tarjeta
    numeroTarj.textContent = valorInput;

    if(valorInput == '' ){
        numeroTarj.textContent = '**** **** **** **** ';

        logoMarca.innerHTML = '';
    }

    if(valorInput [0] == 4){
        logoMarca.innerHTML = '';
        
        const imgTarj = document.createElement('img');
        imgTarj.src = '../img/logos/visa.png';
        logoMarca.appendChild(imgTarj);
            

    }else{
        if(valorInput [0]== 5){
            logoMarca.innerHTML = '';
        
            imgTarj = document.createElement('img');
            imgTarj.src = '../img/logos/mastercard.png';
            logoMarca.appendChild(imgTarj);
            
        }
    }
});

//nombre del titular
formTarjeta.inputNombre.addEventListener('keyup',(e)=>{
    let valorInput = e.target.value;

    formTarjeta.inputNombre.value = valorInput.replace(/[0-9]/g,'');
    titularTarj.textContent=valorInput;
//para que no quede vacio el nombre cuando se borre
    titularTarj.textContent = valorInput;
    if(valorInput == '' ){
        titularTarj.textContent = 'ingrese su nombre';
    }
});

//expiracion en tarjeta

formTarjeta.selectMes.addEventListener('change',(e)=>{
    expMes.textContent = e.target.value;
})
formTarjeta.selectYear.addEventListener('change',(e)=>{
    expYear.textContent = e.target.value.slice(2);
})

// codigo de tarjeta ccv

formTarjeta.inputCCV.addEventListener('keyup',()=>{
    formTarjeta.inputCCV.value = formTarjeta.inputCCV.value
    //eliminar los espacios en blanco
    .replace(/\s/g,'')
    //eliminar letras
    .replace(/\D/g,'');
    
    ccv.textContent = formTarjeta.inputCCV.value ;

})
