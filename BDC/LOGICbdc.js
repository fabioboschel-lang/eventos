
import { supabase } from "../supabase.js";

import {
  obtenerCantidadesSeleccionadas
} from "./ticketsDB.js";

/*
============================================================

LISTENER DE COMPRA

============================================================
*/


export function inicializarCompra(  evento, eventId, userId ) {


  /*
  ==========================================================

  OBTENER BOTON

  ==========================================================
  */

  const comprarBtn =
    document.getElementById(
      "comprarBtn"
    );


  if (!comprarBtn) {

    console.error(
      "No existe el elemento comprarBtn."
    );

    return;

  }


  /*
  ==========================================================

  LISTENER CLICK

  ==========================================================
  */
comprarBtn.addEventListener(
  "click",
  async () => {

    /*
    ======================================================
    OBTENER ID DEL USUARIO
    ======================================================
    */

    if (!userId) {

      const autenticacion =
        document.getElementById(
          "autenticacion"
        );

      if (autenticacion) {

        autenticacion.style.display =
          "block";

      }

      return;

    }


    /*
    ======================================================
    OBTENER CANTIDADES SELECCIONADAS
    ======================================================
    */

    const cantidadesSeleccionadas =
      obtenerCantidadesSeleccionadas();


    /*
    ======================================================
    TRANSFORMAR DATOS
    ======================================================
    */

    const tickets = [];

    let total = 0;


    for (
      const [tipo, datos]
      of Object.entries(
        cantidadesSeleccionadas
      )
    ) {

      const cantidad =
        Number(
          datos.cantidad
        );

      const valor =
        Number(
          datos.valor
        );


      if (
        !Number.isFinite(cantidad) ||
        !Number.isFinite(valor) ||
        cantidad <= 0
      ) {

        continue;

      }


      const subtotal =
        valor *
        cantidad;


      tickets.push({

        tipo:
          tipo,

        cantidad:
          cantidad,

        subtotal:
          subtotal

      });


      total +=
        subtotal;

    }


    /*
    ======================================================
    CREAR PREFERENCIA
    ======================================================
    */

    try {

      const {
        data,
        error
      } =
        await supabase.functions.invoke(
          "create-ticket-payment",
          {
            body: {

  user_id:
    userId,

  socio_id:
    evento["ID usuario"],

  event_id:
    eventId,

  tickets:
    tickets,

  total:
    total

}

          }
        );


      if (error) {

  console.error(
    "Error creando preferencia:",
    error
  );

  if (error.context) {

    try {

      const details =
        await error.context.json();

      console.error(
        "Respuesta de Mercado Pago:",
        details
      );

    } catch (e) {

      console.error(
        "No se pudo leer el detalle del error:",
        e
      );

    }

  }

  return;

}


/*
====================================================
MOSTRAR RESPUESTA
====================================================
*/

console.log(
  "Preferencia creada:",
  data
);


/*
====================================================
REDIRECCIÓN
====================================================
*/

if (
  data &&
  data.init_point
) {

  window.location.href =
    data.init_point;

} else {

  console.error(
    "Mercado Pago no devolvió init_point."
  );

}


} catch (error) {

  console.error(
    "Error inesperado creando preferencia:",
    error
  );

}

  }
);

}
