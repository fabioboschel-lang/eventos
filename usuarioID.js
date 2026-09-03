/*
============================================================

ID DE USUARIO DEL DISPOSITIVO

============================================================
*/

export function obtenerUsuarioID() {

  const clave =
    "scannervybe-user-id";


  /*
  ==========================================================

  BUSCAR ID EXISTENTE

  ==========================================================
  */

  let userId =
    localStorage.getItem(
      clave
    );


  /*
  ==========================================================

  SI NO EXISTE → CREAR UNO

  ==========================================================
  */

  if (!userId) {

    userId =
      crypto.randomUUID();

    localStorage.setItem(
      clave,
      userId
    );

  }


  /*
  ==========================================================

  DEVOLVER ID

  ==========================================================
  */

  return userId;

}