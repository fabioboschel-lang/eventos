import { supabase } from "./supabase.js";

import { planillas }
  from "./planillas/index.js";



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

    console.error(
      "No se pudo obtener el eventid desde la URL."
    );

    return null;

  }


  return partes[1];

}



/*
 * ============================================================
 * APLICAR COLOR DE FONDO
 * ============================================================
 */

function aplicarColorFondo(color) {

  document.body.style.backgroundColor =
    color;

}



/*
 * ============================================================
 * APLICAR TIPOGRAFÍA
 * ============================================================
 */

function aplicarTipografia(tipografia) {

  document.body.style.fontFamily =
    tipografia;


  document.documentElement.style
    .fontFamily =
      tipografia;


  document
    .querySelectorAll("*")
    .forEach(
      (elemento) => {

        elemento.style.fontFamily =
          tipografia;

      }
    );

}



/*
 * ============================================================
 * EJECUTAR PLANILLA
 * ============================================================
 */

function ejecutarPlanilla(numero) {

  const funcionPlanilla =
    planillas[
      Number(numero)
    ];


  if (
    typeof funcionPlanilla !==
    "function"
  ) {

    console.error(
      "No existe la planilla:",
      numero
    );

    return;

  }


  funcionPlanilla();

}



/*
 * ============================================================
 * CARGAR SOCIOSTYLE
 * ============================================================
 */

export async function cargarSocioStyle() {

  /*
   * OBTENER EVENTID
   */

  const eventId =
    obtenerEventId();


  if (!eventId) {

    return;

  }



  /*
   * ==========================================================
   * CONSULTAR CONFIGURACIÓN
   * ==========================================================
   */

  const {
    data: estilo,
    error
  } =
    await supabase
      .from("sociostyle")
      .select(`
        eventid,
        "color de fondo",
        planilla,
        tipografia
      `)
      .eq(
        "eventid",
        eventId
      )
      .maybeSingle();



  /*
   * ERROR
   */

  if (error) {

    console.error(
      "Error obteniendo sociostyle:",
      error
    );

    return;

  }



  /*
   * ==========================================================
   * CONFIGURACIÓN NO ENCONTRADA
   * ==========================================================
   */

  if (!estilo) {

    console.error(
      "No existe configuración sociostyle para el evento:",
      eventId
    );

    return;

  }



  /*
   * ==========================================================
   * EXTRAER VALORES
   * ==========================================================
   */

  const colorFondo =
    estilo["color de fondo"];


  const tipografia =
    estilo.tipografia;


  const numeroPlanilla =
    estilo.planilla;



  /*
   * ==========================================================
   * APLICAR COLOR
   * ==========================================================
   */

  aplicarColorFondo(
    colorFondo
  );



  /*
   * ==========================================================
   * APLICAR TIPOGRAFÍA
   * ==========================================================
   */

  aplicarTipografia(
    tipografia
  );



  /*
   * ==========================================================
   * APLICAR PLANILLA
   * ==========================================================
   */

  ejecutarPlanilla(
    numeroPlanilla
  );

}



/*
 * ============================================================
 * INICIALIZAR
 * ============================================================
 */

cargarSocioStyle();