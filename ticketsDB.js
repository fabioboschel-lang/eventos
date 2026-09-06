import { supabase } from "./supabase.js";


/*
============================================================

OBTENER TICKETS DEL EVENTO

============================================================
*/

export async function obtenerTickets(eventoID) {

  const {
    data: tickets,
    error
  } =
    await supabase
      .from("ticketsdate")
      .select(`
        id,

        evento_id,

        tipo1,
        tipo2,
        tipo3,
        tipo4,
        tipo5,
        tipo6,
        tipo7,

        valor1,
        valor2,
        valor3,
        valor4,
        valor5,
        valor6,
        valor7
      `)
      .eq(
        "evento_id",
        eventoID
      )
      .maybeSingle();


  /*
  ==========================================================

  ERROR

  ==========================================================
  */

  if (error) {

    console.error(
      "Error obteniendo tickets:",
      error
    );

    return null;

  }


  return tickets;

}