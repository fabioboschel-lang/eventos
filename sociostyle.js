import { supabase } from "./supabase.js";


/*
 * ============================================================
 * SOCIO STYLE
 * ============================================================
 *
 * Obtiene el ID del evento desde la URL.
 *
 * Ejemplo:
 *
 * #/evento/8
 *
 * Luego busca en "sociostyle" la fila cuyo
 * "eventid" coincida con ese ID.
 *
 * De esa fila obtiene:
 *
 * - color de fondo
 * - planilla
 * - tipografia
 *
 * y aplica el estilo correspondiente a la página.
 */


/*
 * ============================================================
 * OBTENER ID DEL EVENTO DESDE LA URL
 * ============================================================
 */

function obtenerEventId() {

  const hash =
    window.location.hash;


  const partes =
    hash
      .replace(/^#\/?/, "")
      .split("/");


  if (
    partes[0] !== "evento" ||
    !partes[1]
  ) {

    return null;

  }


  return partes[1];

}


/*
 * ============================================================
 * OBTENER ESTILO DEL EVENTO
 * ============================================================
 */

async function obtenerSocioStyle(eventId) {

  const {
    data,
    error
  } =
    await supabase
      .from("sociostyle")
      .select(`
        "color de fondo",
        planilla,
        tipografia,
        eventid
      `)
      .eq(
        "eventid",
        eventId
      )
      .limit(1)
      .maybeSingle();


  if (error) {

    console.error(
      "Error obteniendo sociostyle:",
      error
    );

    return null;

  }


  if (!data) {

    console.warn(
      "No existe configuración de estilo para el evento:",
      eventId
    );

    return null;

  }


  return data;

}


/*
 * ============================================================
 * PLANILLAS
 * ============================================================
 *
 * Cada número representa una estructura visual diferente.
 *
 * La función recibe el número almacenado en la base de datos
 * y aplica las condiciones correspondientes.
 */

function aplicarPlanilla(planilla) {

  const numero =
    Number(planilla);


  /*
   * ==========================================================
   * PLANILLA 1
   * ==========================================================
   *
   * Imagen:
   * 100% ancho
   * 50% altura del viewport
   *
   * Luego:
   * Nombre
   * Descripción
   * Fecha
   * Botón
   */

  if (numero === 1) {

    document.documentElement.style
      .setProperty(
        "--evento-imagen-ancho",
        "100%"
      );


    document.documentElement.style
      .setProperty(
        "--evento-imagen-alto",
        "50dvh"
      );


    document.documentElement.style
      .setProperty(
        "--evento-contenido-direccion",
        "column"
      );

    return;

  }


  /*
   * ==========================================================
   * PLANILLA 2
   * ==========================================================
   *
   * Misma estructura.
   *
   * Imagen:
   * 50% del ancho.
   */

  if (numero === 2) {

    document.documentElement.style
      .setProperty(
        "--evento-imagen-ancho",
        "50%"
      );


    document.documentElement.style
      .setProperty(
        "--evento-imagen-alto",
        "50dvh"
      );


    document.documentElement.style
      .setProperty(
        "--evento-contenido-direccion",
        "column"
      );

    return;

  }


  /*
   * ==========================================================
   * PLANILLA DESCONOCIDA
   * ==========================================================
   */

  console.warn(
    "Planilla no reconocida:",
    planilla
  );

}


/*
 * ============================================================
 * APLICAR ESTILO
 * ============================================================
 */

function aplicarEstilo(estilo) {

  /*
   * COLOR DE FONDO
   */

  const color =
    estilo["color de fondo"];


  if (color) {

    document.documentElement.style
      .setProperty(
        "--evento-color-fondo",
        color
      );

    document.body.style.backgroundColor =
      color;

  }


  /*
   * TIPOGRAFÍA
   */

  const tipografia =
    estilo.tipografia;


  if (tipografia) {

    document.documentElement.style
      .setProperty(
        "--evento-tipografia",
        tipografia
      );

    document.body.style.fontFamily =
      tipografia;

  }


  /*
   * PLANILLA
   */

  aplicarPlanilla(
    estilo.planilla
  );

}


/*
 * ============================================================
 * FUNCIÓN PRINCIPAL
 * ============================================================
 */

export async function cargarSocioStyle() {

  const eventId =
    obtenerEventId();


  if (!eventId) {

    console.error(
      "No se pudo obtener el ID del evento desde la URL."
    );

    return null;

  }


  const estilo =
    await obtenerSocioStyle(
      eventId
    );


  if (!estilo) {

    return null;

  }


  aplicarEstilo(
    estilo
  );


  return estilo;

}