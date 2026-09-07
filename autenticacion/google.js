import { supabase } from "../supabase.js";


/*

==========================================================

INICIALIZAR GOOGLE

==========================================================
*/


export function inicializarGoogle() {


  const googleBtn =
    document.getElementById(
      "googleBtn"
    );


  if (!googleBtn) {

    console.error(
      "No existe el botón de Google."
    );

    return;

  }


  /*

  ========================================================

  LISTENER GOOGLE

  ========================================================
  */


  googleBtn.addEventListener(
    "click",
    async () => {


      /*

      ======================================================

      OBTENER URL ACTUAL

      ======================================================
      */


      const redirectTo =
        window.location.origin +
        window.location.pathname +
        window.location.hash;


      /*

      ======================================================

      AUTENTICACIÓN CON GOOGLE

      ======================================================
      */


      const {
        data,
        error
      } =
        await supabase.auth.signInWithOAuth({

          provider:
            "google",

          options: {

            redirectTo:
              redirectTo

          }

        });


      console.log(
        data
      );


      /*

      ======================================================

      ERROR

      ======================================================
      */


      if (error) {

        console.error(
          error
        );

        alert(
          "No se pudo iniciar sesión."
        );

      }

    }
  );

}
