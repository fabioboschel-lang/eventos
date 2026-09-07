/*

==========================================================

CARGAR DATOS DEL EVENTO

==========================================================
*/


export function cargarDatos(
  evento
) {


  /*

  ========================================================

  RENDERIZAR IMAGEN

  ========================================================
  */


  document
  .getElementById("eventoImagen")
  .src =
  evento.imagen;


  /*

  ========================================================

  RENDERIZAR NOMBRE

  ========================================================
  */


  document
  .getElementById("eventoNombre")
  .textContent =
  evento.nombre;


  /*

  ========================================================

  RENDERIZAR DESCRIPCIÓN

  ========================================================
  */


  document
  .getElementById("eventoDescripcion")
  .textContent =
  evento.descripcion;


  /*

  ========================================================

  RENDERIZAR FECHA

  ========================================================
  */


  const fecha =
  new Date(
    evento.fecha
  );


  document
  .getElementById("eventoFecha")
  .textContent =
  `📅 ${fecha.toLocaleString(
    "es-AR",
    {
      dateStyle:
        "full",

      timeStyle:
        "short"
    }
  )}`;


  /*

  ========================================================

  RENDERIZAR VALOR

  ========================================================
  */


  document
  .getElementById("eventoValor")
  .textContent =
  `$${Number(
    evento.valor
  ).toLocaleString(
    "es-AR"
  )}`;

}