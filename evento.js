import { supabase } from "./supabase.js";

import { HTMLbdc } from "./HTMLbdc.js";
import { obtenerEvento } from "./eventosDB.js";
import { cargarSocioStyle } from "./sociostyle.js";




/*
 * ============================================================
 * VISTA DEL EVENTO
 * ============================================================
 */

export async function Evento(app) {

  app.innerHTML = `

    <main>

      <div
        id="eventoLoading"
        class="evento-loading"
      >
        Cargando evento...
      </div>


      <section
        id="eventoContainer"
        class="evento-container"
        style="display: none;"
      >

        <div
          class="evento-image-container"
        >

          <img
            id="eventoImagen"
            class="evento-image"
            alt="Imagen del evento"
          >

        </div>


        <h1
          id="eventoNombre"
          class="evento-name"
        ></h1>


        <p
          id="eventoDescripcion"
          class="evento-description"
        ></p>


        <div
          id="eventoFecha"
          class="evento-data"
        ></div>


        <div
          id="eventoValor"
          class="evento-price"
        ></div>


        ${HTMLbdc}

      </section>


      <div
        id="eventoError"
        class="evento-error"
        style="display: none;"
      >
        No se pudo encontrar este evento.
      </div>

    </main>

  `;


  /*
   * ==========================================================
   * CARGAR ESTILO Y EVENTO
   * ==========================================================
   *
   * Primero se obtiene y aplica sociostyle.
   *
   * Después se carga y presenta el evento.
   *
   * De esta manera la interfaz no se muestra antes
   * de que su configuración visual haya sido aplicada.
   */

  try {

    await cargarSocioStyle();

    await cargarEvento();

  } catch (error) {

    console.error(
      "Error inicializando evento:",
      error
    );

    mostrarError();

  }

}



/*
 * ============================================================
 * CARGAR EVENTO
 * ============================================================
 */

async function cargarEvento() {

  const loading =
    document.getElementById(
      "eventoLoading"
    );


  const container =
    document.getElementById(
      "eventoContainer"
    );

const hash =
  window.location.hash;


const partes =
  hash
    .replace(/^#\/?/, "")
    .split("/");


const id =
  partes[0] === "evento" &&
  partes[1]
    ? partes[1]
    : null;

if (!id) {

  mostrarError();

  return;

}

const evento =
  await obtenerEvento(id);

  



  /*
   * ==========================================================
   * RENDERIZAR IMAGEN
   * ==========================================================
   */

  document
    .getElementById("eventoImagen")
    .src =
      evento.imagen;



  /*
   * ==========================================================
   * RENDERIZAR NOMBRE
   * ==========================================================
   */

  document
    .getElementById("eventoNombre")
    .textContent =
      evento.nombre;



  /*
   * ==========================================================
   * RENDERIZAR DESCRIPCIÓN
   * ==========================================================
   */

  document
    .getElementById("eventoDescripcion")
    .textContent =
      evento.descripcion;



  /*
   * ==========================================================
   * RENDERIZAR FECHA
   * ==========================================================
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
          dateStyle: "full",
          timeStyle: "short"
        }
      )}`;



  /*
   * ==========================================================
   * RENDERIZAR VALOR
   * ==========================================================
   */

  document
    .getElementById("eventoValor")
    .textContent =
      `$${Number(
        evento.valor
      ).toLocaleString(
        "es-AR"
      )}`;



  /*
   * ==========================================================
   * BOTÓN COMPRAR
   * ==========================================================
   */

  const comprarBtn =
    document.getElementById(
      "comprarBtn"
    );


  comprarBtn.addEventListener(
    "click",
    async () => {


      /*
       * OBTENER ID DEL USUARIO
       */

      const userId =
        localStorage.getItem(
          "scannervybe-user-id"
        );


      if (!userId) {

        console.error(
          "No existe ID de usuario en localStorage."
        );

        return;

      }



      /*
       * ID DEL EVENTO
       */

      const eventId =
  id;



      /*
       * PRECIO DEL EVENTO
       */

      const price =
        Number(
          evento.valor
        );



      /*
       * VALIDAR PRECIO
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
       * ======================================================
       * CREAR PREFERENCIA
       * ======================================================
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
         * MOSTRAR RESPUESTA
         */

        console.log(
          "Preferencia creada:",
          data
        );



        /*
         * ====================================================
         * REDIRECCIÓN A MERCADO PAGO
         * ====================================================
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



  /*
   * ==========================================================
   * MOSTRAR EVENTO
   * ==========================================================
   *
   * El estilo de sociostyle ya fue aplicado antes de llegar
   * a este punto.
   */

  loading.style.display =
    "none";


  container.style.display =
    "block";

}



/*
 * ============================================================
 * MOSTRAR ERROR
 * ============================================================
 */

function mostrarError() {

  const loading =
    document.getElementById(
      "eventoLoading"
    );


  const errorElement =
    document.getElementById(
      "eventoError"
    );


  if (loading) {

    loading.style.display =
      "none";

  }


  if (errorElement) {

    errorElement.style.display =
      "block";

  }

}