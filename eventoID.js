export function obtenerEventoID() {

  const hash =
    window.location.hash;

  const partes =
    hash
      .replace(/^#\/?/, "")
      .split("/");

  if (
    partes[0] !== "evento" ||
    !partes[1]
  ) {
    return null;
  }

  return partes[1];
}