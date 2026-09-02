import { supabase } from "./supabase.js";

export async function obtenerEvento(id) {

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
        fecha,
        valor
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

    return null;

  }

  return evento;

}