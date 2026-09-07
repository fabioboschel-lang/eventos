import { supabase } from "./supabase.js";

export function obtenerUsuarioID() {

  const clave =
    "sb-qexgbswdbwlpydolpcll-auth-token";

  const datos =
    localStorage.getItem(
      clave
    );

  if (!datos) {

    return null;

  }

  try {

    const session =
      JSON.parse(
        datos
      );

    if (
      !session ||
      !session.user ||
      !session.user.id
    ) {

      return null;

    }

    return session.user.id;

  } catch (error) {

    console.error(
      "Error leyendo sesión de Supabase:",
      error
    );

    return null;

  }

}