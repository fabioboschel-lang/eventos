
import { supabase } from "./supabase.js";

import {
  obtenerCantidadesSeleccionadas
} from "./ticketsDB.js";

/*
============================================================

LISTENER DE COMPRA

============================================================
*/


export function inicializarCompra(  eventId, userId ) {


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

      const eventId =
        eventId;


      /*
      ======================================================
      PRECIO DEL EVENTO
      ======================================================
      */

      const price =
        Number(
          evento.valor
        );


      /*
      ======================================================
      VALIDAR PRECIO
      ======================================================
      */

      if (
        !Number.isFinite(price) ||
        price <= 0
      ) {

        console.error(
          "El precio del evento no es válido:",
          evento.valor
        );

        return;

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

                event_id:
                  eventId,

                price:
                  price

              }

            }
          );


        if (error) {

          throw error;

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
          "Error creando preferencia:",
          error
        );

      }

    }
  );

}
