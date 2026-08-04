import { Evento } from "./evento.js";
import { Otra } from "./otra.js";


const app =
  document.getElementById("app");


const routes = {

  evento: Evento,

  otra: Otra,

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


function iniciarApp() {

  navigate("evento");

}


iniciarApp();
