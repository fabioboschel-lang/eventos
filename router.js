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

   {

    navigate("evento");

    return;

  }


  console.error(
    "Ruta inexistente:",
    hash
  );

}


iniciarApp();

