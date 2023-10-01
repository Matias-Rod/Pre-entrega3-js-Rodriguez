// Función para calcular el promedio
function calcularPromedio(nota1, nota2, nota3) {
    return (nota1 + nota2 + nota3) / 3;
}

// Función para agregar un alumno a la lista
function agregarAlumnoALista(alumno) {
    const list = document.querySelector(".list");
    const listItem = document.createElement("li");
    
    const nameDiv = document.createElement("div");
    nameDiv.textContent = alumno.nombre;
    listItem.appendChild(nameDiv);

    const nota1Div = document.createElement("div");
    nota1Div.textContent = alumno.notas[0];
    listItem.appendChild(nota1Div);

    const nota2Div = document.createElement("div");
    nota2Div.textContent = alumno.notas[1];
    listItem.appendChild(nota2Div);

    const nota3Div = document.createElement("div");
    nota3Div.textContent = alumno.notas[2];
    listItem.appendChild(nota3Div);

    const promedioDiv = document.createElement("div");
    promedioDiv.textContent = alumno.promedio.toFixed(2);
    listItem.appendChild(promedioDiv);

    list.appendChild(listItem);
}

// Función para agregar un alumno al array
function agregarAlumno(nombre, nota1, nota2, nota3) {
    const alumno = {
        nombre: nombre,
        notas: [nota1, nota2, nota3],
        promedio: calcularPromedio(nota1, nota2, nota3)
    };
    alumnos.push(alumno);

    // Agregar el alumno a la lista
    agregarAlumnoALista(alumno);

}

const alumnos = []; 

// Se obtiene el formulario y los campos
const formulario = document.getElementById("alumno-form");
const nombreInput = document.getElementById("nombre");
const nota1Input = document.getElementById("nota-1");
const nota2Input = document.getElementById("nota-2");
const nota3Input = document.getElementById("nota-3");

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = nombreInput.value;
    const nota1 = parseFloat(nota1Input.value);
    const nota2 = parseFloat(nota2Input.value);
    const nota3 = parseFloat(nota3Input.value);

    // Calcular el promedio
    const promedio = calcularPromedio(nota1, nota2, nota3);

    // Crear un objeto de alumno y agregarlo al array
    agregarAlumno(nombre, nota1, nota2, nota3);

    // Almacenar datos en el Local Storage
    const alumnoData = {
        nombre: nombre,
        nota1: nota1,
        nota2: nota2,
        nota3: nota3,
        promedio: promedio
    };
    localStorage.setItem(nombre, JSON.stringify(alumnoData));

    nombreInput.value = "";
    nota1Input.value = "";
    nota2Input.value = "";
    nota3Input.value = "";
});



// Variable para ver si la lista está filtrada
let listaFiltrada = false;

// Función para mostrar la lista de alumnos por condición (aprobados o desaprobados)
function mostrarListaPorCondicion(aprobados) {
    const list = document.querySelector(".list");
    list.innerHTML = "";

    if (aprobados === listaFiltrada) {
        for (const alumno of alumnos) {
            agregarAlumnoALista(alumno);
        }
        listaFiltrada = !listaFiltrada;
    } else {
        for (const alumno of alumnos) {
            if ((aprobados && alumno.promedio >= 7) || (!aprobados && alumno.promedio < 7)) {
                agregarAlumnoALista(alumno);
            }
        }
        listaFiltrada = aprobados; 
    }
}

const aprobadosButton = document.getElementById("aprobados");
const desaprobadosButton = document.getElementById("desaprobados");

aprobadosButton.addEventListener("click", function () {
    mostrarListaPorCondicion(true);
});

desaprobadosButton.addEventListener("click", function () {
    mostrarListaPorCondicion(false);
});

// Recupera datos almacenados en el Local Storage
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const alumnoData = JSON.parse(localStorage.getItem(key));
    agregarAlumno(alumnoData.nombre, alumnoData.nota1, alumnoData.nota2, alumnoData.nota3);
}

const url = './alumnos.json'

fetch(url) 
  .then(response => response.json())
  .then(data => {
    const alumnosData = data.Alumnos; 
    const listaAlumnos = document.getElementById('listaAlumnos'); 

    const tabla = document.querySelector('#tablaAlumnos')

    tabla.classList.add('tabla-alumnos')

    const cabecera = document.createElement('thead');
    cabecera.innerHTML = `
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>DNI</th>
      </tr>
    `;
    tabla.appendChild(cabecera);

    const cuerpo = document.createElement('tbody');
    for (const alumnoData of alumnosData) {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${alumnoData.Nombre}</td>
        <td>${alumnoData.Apellido}</td>
        <td>${alumnoData.DNI}</td>
      `;
      cuerpo.appendChild(fila);
    }
    tabla.appendChild(cuerpo);

    listaAlumnos.appendChild(tabla);
  })
