const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // Agregar un curso apretando "Agregar al Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // Elimina cursos del carrito 
  carrito.addEventListener("click", eliminarCurso)

  // Vaciar carrito

  vaciarCarritoBtn.addEventListener("click", vaciarCarrito)
}

//Funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Lee el contenido de HTML al que demos click y extrae información del curso

function eliminarCurso(e){
    if(e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id")

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)

        carritoHTML()
    }
}

function vaciarCarrito(){
    articulosCarrito = []
    limpiarHTML()
}


function leerDatosCurso(curso) {
  //console.log(curso)

  //Crear objeto contenido del curso seleccionado
  const infoCurso = {
    titulo: curso.querySelector("h4").textContent,
    imagen: curso.querySelector("img").src,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe
  const existe = articulosCarrito.some( (curso) => curso.id === infoCurso.id)
  if (existe){
    const cursos = articulosCarrito.map( (curso) => {
        if(curso.id === infoCurso.id) {
            curso.cantidad++
            return curso
        } else {
            return curso
        }
    })  

    articulosCarrito = [...cursos]
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];

  }

  // Agrega elementos al carrito
  console.log(articulosCarrito);
  carritoHTML();
}

// Muestra el carrito de compras en el HTML

function carritoHTML() {
  // Limpiar el HTML
  limpiarHTML();

  //Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {

    const {imagen, titulo, precio, cantidad, id} = curso
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

    // Agrega el HTML
    contenedorCarrito.appendChild(row);
  });
}

// Elimina los cursos del tbody

function limpiarHTML() {
  // Forma lenta
  contenedorCarrito.innerHTML = "";

  // Forma Rapida

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
