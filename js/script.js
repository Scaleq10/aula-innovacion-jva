/* Muestra el modal de aviso (#modalAviso) con un título y un texto */
function mostrarAviso(titulo, texto) {
  var modal = document.getElementById("modalAviso");
  if (!modal) { return; }
  document.getElementById("modalAvisoTitulo").textContent = titulo;
  document.getElementById("modalAvisoTexto").textContent = texto;
  bootstrap.Modal.getOrCreateInstance(modal).show();
}

/* Agrega una fila nueva a la tabla de equipos (solo en pantalla, no se guarda) */
function registrarEquipo() {
  var cuerpo = document.querySelector("table.equipos tbody");
  var equipo = document.getElementById("equipo").value.trim();
  var marca = document.getElementById("marca").value.trim();
  var estado = document.getElementById("estado").value;

  // Cada estado usa una etiqueta de color distinta
  var clases = {
    "Operativa": "tag--verde",
    "No operativa": "tag--rojo",
    "En mantenimiento": ""
  };

  var fila = document.createElement("tr");
  var celdaEquipo = document.createElement("td");
  var celdaMarca = document.createElement("td");
  var celdaEstado = document.createElement("td");
  var etiqueta = document.createElement("span");

  celdaEquipo.textContent = equipo;
  celdaMarca.textContent = marca;
  etiqueta.className = ("tag " + (clases[estado] || "")).trim();
  etiqueta.textContent = estado;

  celdaEstado.appendChild(etiqueta);
  fila.appendChild(celdaEquipo);
  fila.appendChild(celdaMarca);
  fila.appendChild(celdaEstado);
  cuerpo.appendChild(fila);

  mostrarAviso("Equipo agregado", "Se agregó «" + equipo + " " + marca + "» a la tabla (el registro se muestra solo en esta pantalla).");
}

document.addEventListener("DOMContentLoaded", function () {

  // 1) Resaltar el enlace activo comparando la URL actual con cada href
  var paginaActual = window.location.pathname.split("/").pop() || "index.html";
  var enlaces = document.querySelectorAll(".navbar .nav-link");

  enlaces.forEach(function (enlace) {
    var destino = enlace.getAttribute("href");
    if (destino === paginaActual) {
      enlace.setAttribute("aria-current", "page");
    }
  });

  // 2) Validación de formularios (clases de Bootstrap: needs-validation / was-validated)
  var formularios = document.querySelectorAll(".needs-validation");

  formularios.forEach(function (formulario) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();          // no hay servidor: se maneja todo en la página

      if (!formulario.checkValidity()) {
        evento.stopPropagation();
        formulario.classList.add("was-validated");
        return;
      }

      if (formulario.id === "formEquipo") {
        registrarEquipo();                                          // 3) nuevo equipo
      } else if (formulario.id === "formContacto") {
        var nombre = document.getElementById("nombre").value.trim();
        mostrarAviso(                                               // 4) mensaje dinámico
          "Mensaje recibido",
          "Gracias, " + nombre + ". Tu mensaje fue validado correctamente " +
          "(versión de demostración: aún no se envía a ningún servidor)."
        );
      }

      formulario.reset();
      formulario.classList.remove("was-validated");
    });
  });

  // 5) Galería: el modal toma la foto del botón que lo abrió
  var modalFoto = document.getElementById("modalFoto");

  if (modalFoto) {
    modalFoto.addEventListener("show.bs.modal", function (evento) {
      var boton = evento.relatedTarget;
      var imagen = document.getElementById("modalFotoImg");
      imagen.src = boton.getAttribute("data-img");
      imagen.alt = boton.getAttribute("data-alt");
      document.getElementById("modalFotoTitulo").textContent = boton.getAttribute("data-titulo");
    });
  }

});
