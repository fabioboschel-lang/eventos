import { supabase } from "./supabase.js";


/*
============================================================

CANTIDADES SELECCIONADAS

============================================================

Ejemplo:

{
  General: 2,
  VIP: 3
}

============================================================
*/


const cantidadesSeleccionadas = {};


/*
============================================================

OBTENER TICKETS

============================================================
*/


export async function obtenerTickets(eventoID) {

  const {
    data: tickets,
    error
  } =
    await supabase
      .from("ticketsdate")
      .select(`
        id,

        evento_id,

        tipo1,
        tipo2,
        tipo3,
        tipo4,
        tipo5,
        tipo6,
        tipo7,

        valor1,
        valor2,
        valor3,
        valor4,
        valor5,
        valor6,
        valor7
      `)
      .eq(
        "evento_id",
        eventoID
      )
      .maybeSingle();


  /*
  ==========================================================

  ERROR

  ==========================================================
  */

  if (error) {

    console.error(
      "Error obteniendo tickets:",
      error
    );

    return null;

  }


  /*
  ==========================================================

  SI NO EXISTEN TICKETS

  ==========================================================
  */

  if (!tickets) {

    return null;

  }


  /*
  ==========================================================

  CONTENEDOR

  ==========================================================
  */

  const contenedor =
    document.getElementById(
      "bdcTickets"
    );


  if (!contenedor) {

    console.error(
      "No existe el contenedor bdcTickets."
    );

    return tickets;

  }


  /*
  ==========================================================

  LIMPIAR CONTENEDOR

  ==========================================================
  */

  contenedor.innerHTML = "";


  /*
  ==========================================================

  CREAR FILAS

  ==========================================================
  */

  for (
    let i = 1;
    i <= 7;
    i++
  ) {

    const tipo =
      tickets[
        `tipo${i}`
      ];


    const valor =
      tickets[
        `valor${i}`
      ];


    /*
    ========================================================

    IGNORAR POSICIONES VACIAS

    ========================================================
    */

    if (
      tipo === null ||
      tipo === undefined ||
      valor === null ||
      valor === undefined
    ) {

      continue;

    }


    /*
    ========================================================

    CANTIDAD INICIAL

    ========================================================
    */

    cantidadesSeleccionadas[
      tipo
    ] = 0;


    /*
    ========================================================

    CREAR FILA

    ========================================================
    */

    const fila =
      document.createElement(
        "div"
      );


    fila.className =
      "bdc-ticket";


    /*
    ========================================================

    COLUMNA TIPO

    ========================================================
    */

    const tipoElemento =
      document.createElement(
        "div"
      );


    tipoElemento.className =
      "bdc-columna-tipo";


    tipoElemento.textContent =
      tipo;


    /*
    ========================================================

    COLUMNA VALOR

    ========================================================
    */

    const valorElemento =
      document.createElement(
        "div"
      );


    valorElemento.className =
      "bdc-columna-valor";


    valorElemento.textContent =
      `$${Number(valor).toLocaleString("es-AR")}`;


    /*
    ========================================================

    COLUMNA CANTIDAD

    ========================================================
    */

    const cantidadElemento =
      document.createElement(
        "div"
      );


    cantidadElemento.className =
      "bdc-columna-cantidad";


    /*
    ========================================================

    BOTON MENOS

    ========================================================
    */

    const botonMenos =
      document.createElement(
        "button"
      );


    botonMenos.type =
      "button";


    botonMenos.className =
      "bdc-cantidad-menos";


    botonMenos.textContent =
      "−";


    /*
    ========================================================

    NUMERO DE CANTIDAD

    ========================================================
    */

    const numeroCantidad =
      document.createElement(
        "span"
      );


    numeroCantidad.className =
      "bdc-cantidad-numero";


    numeroCantidad.textContent =
      "0";


    /*
    ========================================================

    BOTON MAS

    ========================================================
    */

    const botonMas =
      document.createElement(
        "button"
      );


    botonMas.type =
      "button";


    botonMas.className =
      "bdc-cantidad-mas";


    botonMas.textContent =
      "+";


    /*
    ========================================================

    BOTON MENOS → LOGICA

    ========================================================
    */

    botonMenos.addEventListener(
      "click",
      () => {

        if (
          cantidadesSeleccionadas[tipo] <= 0
        ) {

          return;

        }


        cantidadesSeleccionadas[tipo]--;


        numeroCantidad.textContent =
          cantidadesSeleccionadas[tipo];

      }
    );


    /*
    ========================================================

    BOTON MAS → LOGICA

    ========================================================
    */

    botonMas.addEventListener(
      "click",
      () => {

        cantidadesSeleccionadas[tipo]++;


        numeroCantidad.textContent =
          cantidadesSeleccionadas[tipo];

      }
    );


    /*
    ========================================================

    ARMAR COLUMNA CANTIDAD

    ========================================================
    */

    cantidadElemento.appendChild(
      botonMenos
    );


    cantidadElemento.appendChild(
      numeroCantidad
    );


    cantidadElemento.appendChild(
      botonMas
    );


    /*
    ========================================================

    ARMAR FILA

    ========================================================
    */

    fila.appendChild(
      tipoElemento
    );


    fila.appendChild(
      valorElemento
    );


    fila.appendChild(
      cantidadElemento
    );


    /*
    ========================================================

    INSERTAR FILA

    ========================================================
    */

    contenedor.appendChild(
      fila
    );

  }


  /*
  ==========================================================

  DEVOLVER DATOS

  ==========================================================
  */

  return tickets;

}


/*
============================================================

OBTENER CANTIDADES SELECCIONADAS

============================================================

Devuelve una copia del objeto para utilizarlo
desde evento.js.

============================================================
*/


export function obtenerCantidadesSeleccionadas() {

  return {
    ...cantidadesSeleccionadas
  };

}
