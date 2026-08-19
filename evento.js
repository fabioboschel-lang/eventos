import { supabase } from "./supabase.js";


/*
 * ============================================================
 * PERSISTENCIA DEL USUARIO
 * ============================================================
 *
 * Esta función se ejecuta al entrar a la plataforma.
 *
 * Si ya existe un ID:
 *     no hace nada.
 *
 * Si no existe:
 *     genera uno nuevo y lo guarda.
 */

function inicializarUsuarioLocal() {

  const key =
    "scannervybe-user-id";


  const userId =
    localStorage.getItem(key);


  if (userId) {

    return;

  }


  const nuevoUserId =
    crypto.randomUUID();


  localStorage.setItem(
    key,
    nuevoUserId
  );

}


/*
 * Inicializar inmediatamente
 * el identificador del usuario.
 */

inicializarUsuarioLocal();



/*
 * ============================================================
 * VISTA DEL EVENTO
 * ============================================================
 */

export function Evento(app) {

  app.innerHTML = `

    <main class="evento-view">

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

        <div class="evento-image-container">

          <img
            id="eventoImagen"
            class="evento-image"
            alt="Imagen del evento"
          >

        </div>


        <div class="evento-content">

          <h1
            id="eventoNombre"
            class="evento-name"
          ></h1>


          <div
            id="eventoFecha"
            class="evento-data"
          ></div>


          <div
            id="eventoUbicacion"
            class="evento-data"
          ></div>


          <div
            id="eventoValor"
            class="evento-price"
          ></div>


          <p
            id="eventoDescripcion"
            class="evento-description"
          ></p>


          <a
            id="eventoRedes"
            class="evento-socials"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>


          <button
            id="comprarBtn"
            class="evento-buy-btn"
            type="button"
          >
            Comprar entrada
          </button>

        </div>

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


  cargarEvento();

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


  const errorElement =
    document.getElementById(
      "eventoError"
    );



  /*
   * OBTENER HASH
   */

  const hash =
    window.location.hash;



  /*
   * EJEMPLO:
   *
   * #/evento/550e8400-e29b-41d4-a716-446655440000
   */


  const partes =
    hash
      .replace(/^#\/?/, "")
      .split("/");



  /*
   * partes[0] = evento
   * partes[1] = id
   */


  if (
    partes[0] !== "evento" ||
    !partes[1]
  ) {

    mostrarError();

    return;

  }



  const id =
    partes[1];



  /*
   * ==========================================================
   * BUSCAR EVENTO
   * ==========================================================
   */

  const {
    data: evento,
    error
  } =
    await supabase
      .from("Eventos")
      .select(`
        id,
        nombre,
        imagen,
        descripcion,
        redes,
        ubicacion,
        fecha,
        valor,
        color
      `)
      .eq(
        "id",
        id
      )
      .maybeSingle();



  if (error) {

    console.error(
      "Error obteniendo evento:",
      error
    );

    mostrarError();

    return;

  }



  if (!evento) {

    mostrarError();

    return;

  }



  /*
   * ==========================================================
   * RENDERIZAR EVENTO
   * ==========================================================
   */

  document
    .getElementById("eventoImagen")
    .src =
      evento.imagen;


  document
    .getElementById("eventoNombre")
    .textContent =
      evento.nombre;


  document
    .getElementById("eventoDescripcion")
    .textContent =
      evento.descripcion;


  document
    .getElementById("eventoUbicacion")
    .textContent =
      `📍 ${evento.ubicacion}`;


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
   * FECHA
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
   * REDES
   * ==========================================================
   */

  const redes =
    document.getElementById(
      "eventoRedes"
    );


  if (evento.redes) {

    redes.href =
      evento.redes;

    redes.textContent =
      "Ver redes sociales";

  } else {

    redes.style.display =
      "none";

  }



  /*
   * ==========================================================
   * BOTÓN COMPRAR
   * ==========================================================
   *
   * Acá NO generamos ningún usuario.
   *
   * Simplemente recuperamos el ID que la función
   * de persistencia ya guardó.
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
       * DESDE LOCALSTORAGE
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
        evento.id;



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
       * ENVIAR DATOS A LA EDGE FUNCTION
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
                  price,

              },

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
         * REDIRIGIR A MERCADO PAGO
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

  document
    .getElementById("eventoLoading")
    .style.display =
      "none";


  document
    .getElementById("eventoError")
    .style.display =
      "block";

}
