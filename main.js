const formulario = document.getElementById('formulario-calculadora');
const multiplicadorTMB = {peso: 10, altura: 6.25, edad: 5 }
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

if (!nombre || !documento || !nDocumento || !edad || !peso || !altura || !actividad || !generoSeleccionado) {
    mostrarMensajeDeError('Todos los campos son obligatorios');
    return;
}
const resultadoPoblacional = grupoPoblacional(edad);
const resultadoCalorias = calcularCalorias(peso,altura,edad,actividad, generoSeleccionado);

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
aparecerResultado();
actualizarDom ();
console.log(usuarios);
limpiar();

})


function grupoPoblacional(edad){
    if(edad <= 29 )return "Joven";
    else if(edad <= 59) return "Adultos";
    else return "Adultos mayores";
}

function calcularCalorias(peso,altura,edad,actividad, genero) {
    if (genero === "M") {
        return Math.floor(actividad * (multiplicadorTMB.peso * peso + multiplicadorTMB.altura * altura - multiplicadorTMB.edad * edad + 5));
    } else {
        return Math.floor(actividad * (multiplicadorTMB.peso * peso + multiplicadorTMB.altura * altura - multiplicadorTMB.edad * edad - 161));
    }
} 

function actualizarDom (){
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    usuarios.forEach((usuario) => {
        const usuarioDiv = document.createElement('div');
        usuarioDiv.innerHTML = `
            <p>El paciente: ${usuario.nombre}</p>
            <p>Identificado con ${usuario.documento}</p>
            <p>No. ${usuario.nDocumento}</p>
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