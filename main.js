const formulario = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');
const multiplicadorTMB = {
    peso: 10,
    altura: 6.25,
    edad: 5
}

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
    genero: generoSeleccionado
}
console.log(usuario)
calcularCalorias(usuario);
})

//unction resultado() {

//}
function calcularCalorias(usuario) {
    aparecerResultado();  
    let resultadoCalorias;

    if (usuario.genero === "M"){
        resultadoCalorias = (usuario.actividad * (multiplicadorTMB.peso*usuario.peso)+(multiplicadorTMB.altura*usuario.altura)-(multiplicadorTMB.edad*usuario.edad)+5);
        console.log(resultadoCalorias);
    }else {
        resultadoCalorias = (usuario.actividad * (multiplicadorTMB.peso*usuario.peso)+(multiplicadorTMB.altura*usuario.altura)-(multiplicadorTMB.edad*usuario.edad)-161);
    }
    console.log(resultadoCalorias);
    return resultadoCalorias;
}

 

  
        //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5

        //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161

    
    // totalCalorias.value = `${Math.floor(calculoCalorias)} kcal`;
    
resultadosCalorias = calcularCalorias(usuario);     
    resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            <div class="mb-3 w-100">
                <input class="form-control text-center" value="${resultadosCalorias} kcal" style="font-size: 2rem" disabled>
            </div>
        </div>
    `
     // Volver a limpiar variables



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