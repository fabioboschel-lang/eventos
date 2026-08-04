```javascript
import { Evento } from "./evento.js";
import { supabase } from "./supabase.js";


const app =
  document.getElementById("app");


const routes = {

  evento: Evento

};


export function navigate(route) {

  const screen =
    routes[route];


  if (!screen) {

    console.error(
      "Ruta inexistente:",
      route
    );

    return;

  }


  screen(app);

}


/*
 * SUPABASE
 *
 * El cliente queda disponible
 * para las vistas que lo necesiten.
 */

export { supabase };



/*
 * INICIAR APLICACIÓN
 */

function iniciarApp() {

  const hash =
    window.location.hash;


  /*
   * Ejemplo:
   *
   * #/evento/550e8400-e29b-41d4-a716-446655440000
   *
   */

  const partes =
    hash
      .replace(/^#\/?/, "")
      .split("/");


  if (
    partes[0] === "evento" &&
    partes[1]
  ) {

    navigate("evento");

    return;

  }


  console.error(
    "Ruta inexistente:",
    hash
  );

}


iniciarApp();
```
