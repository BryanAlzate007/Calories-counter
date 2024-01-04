const formulario = document.getElementById('formulario-calculadora');
const multiplicadorTMB = {peso: 10, altura: 6.25, edad: 5 }
let resultadoCalorias;
let resultadoPoblacional;
let usuarios = [];
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

const nombre = document.querySelector('#nombre').value;
const documento = document.querySelector('#documento').value;
const nDocumento = document.querySelector('#nDocumento').value;
const edad =  document.querySelector('#edad').value;
const peso = document.querySelector('#peso').value;
const altura = document.querySelector('#altura').value;
const actividad = document.querySelector('#actividad').value;
const generoSeleccionado = document.querySelector('input[name="genero"]:checked').value;

let usuario = {
    nombre: nombre,
    documento: documento,
    nDocumento: nDocumento,
    edad: edad,
    peso: peso,
    altura: altura,
    actividad: actividad,
    genero: generoSeleccionado,
    calorias: resultadoCalorias,
    grupo: resultadoPoblacional,
}
usuarios.push(usuario);
console.log(usuarios);
calcularCalorias(usuario);
aparecerResultado();
limpiar();

})


function grupoPoblacional(usuario){

    if(usuario.edad <= 29 ){
        resultadoPoblacional = "Joven";
    } else if(usuario.edad >= 30 && usuario.edad <= 59) {
        resultadoPoblacional = "Adultos";
    }
    else{
        resultadoPoblacional = "Adultos mayores"
    }
 
}

function calcularCalorias(usuario) {
    
    grupoPoblacional(usuario);

    if (usuario.genero === "M"){
        resultadoCalorias = (usuario.actividad * (multiplicadorTMB.peso*usuario.peso)+(multiplicadorTMB.altura*usuario.altura)-(multiplicadorTMB.edad*usuario.edad)+5);
        console.log(resultadoCalorias);
    }else {
        resultadoCalorias = (usuario.actividad * (multiplicadorTMB.peso*usuario.peso)+(multiplicadorTMB.altura*usuario.altura)-(multiplicadorTMB.edad*usuario.edad)-161);
    }

    actualizarDom ();

if (!(usuario.actividad && usuario.altura && usuario.edad)){
    mostrarMensajeDeError('Debe de registrar todos los campos')
}
} 

function actualizarDom (){
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    usuarios.forEach((usuario) => {
        const usuarioDiv = document.createElement('div');
        usuarioDiv.innerHTML = `
            <p>Nombre: ${usuario.nombre}</p>
            <p>Tipo de Documento: ${usuario.documento}</p>
            <p>No. ${usuario.nDocumento}</p>
            <p>Edad: ${usuario.edad}, Peso: ${usuario.peso}, Altura: ${usuario.altura}</p>
            <p>Actividad: ${usuario.actividad}, Género: ${usuario.genero}</p>
            <p>Cantidad de calorias: ${usuario.calorias}</p>
            <p>Grupo poblacional: ${usuario.grupo}</p>
            <p>_______________________________________________________________</p>
        `;

        resultado.appendChild(usuarioDiv);
    })
}
     // Volver a limpiar variables
function limpiar(){
    nombre.value = null;
    documento.value = null;
    nDocumento.value = null;
    edad.value =  null;
    peso.value = null;
    altura.value = null;
    actividad.value = null;
}
    


function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}