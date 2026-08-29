export function aplicarPlanilla1() {

  const imagenContainer =
    document.querySelector(
      ".evento-image-container"
    );

  const imagen =
    document.getElementById(
      "eventoImagen"
    );

  const nombre =
    document.getElementById(
      "eventoNombre"
    );

  const fecha =
    document.getElementById(
      "eventoFecha"
    );

  const ubicacion =
    document.getElementById(
      "eventoUbicacion"
    );

  const descripcion =
    document.getElementById(
      "eventoDescripcion"
    );

  const comprar =
    document.getElementById(
      "comprarBtn"
    );


  /*
   * ============================================================
   * FONDO
   * ============================================================
   */

  document.body.style.background =
    "#ff0000";


  /*
   * ============================================================
   * IMAGEN
   * ============================================================
   */

  if (imagenContainer) {

    Object.assign(
      imagenContainer.style,
      {

        width:
          "100%",

        marginTop:
          "0",

        marginLeft:
          "0",

        marginRight:
          "0",

        aspectRatio:
          "1 / 1",

        borderRadius:
          "12px",

        overflow:
          "hidden"

      }
    );

  }


  if (imagen) {

    Object.assign(
      imagen.style,
      {

        width:
          "100%",

        height:
          "100%",

        display:
          "block",

        objectFit:
          "cover"

      }
    );

  }


  /*
   * ============================================================
   * NOMBRE
   * ============================================================
   */

  if (nombre) {

    Object.assign(
      nombre.style,
      {

        width:
          "90%",

        marginTop:
          "20px",

        marginLeft:
          "5%",

        marginRight:
          "5%",

        textAlign:
          "left"

      }
    );

  }


  /*
   * ============================================================
   * FECHA
   * ============================================================
   */

  if (fecha) {

    Object.assign(
      fecha.style,
      {

        width:
          "90%",

        marginTop:
          "8px",

        marginLeft:
          "5%",

        marginRight:
          "5%",

        textAlign:
          "left"

      }
    );

  }


  /*
   * ============================================================
   * UBICACIÓN
   * ============================================================
   */

  if (ubicacion) {

    Object.assign(
      ubicacion.style,
      {

        width:
          "90%",

        marginTop:
          "8px",

        marginLeft:
          "5%",

        marginRight:
          "5%",

        textAlign:
          "left"

      }
    );

  }


  /*
   * ============================================================
   * DESCRIPCIÓN
   * ============================================================
   */

  if (descripcion) {

    Object.assign(
      descripcion.style,
      {

        width:
          "90%",

        marginTop:
          "16px",

        marginLeft:
          "5%",

        marginRight:
          "5%",

        textAlign:
          "left"

      }
    );

  }


  /*
   * ============================================================
   * BOTÓN DE COMPRA
   * ============================================================
   */

  if (comprar) {

    Object.assign(
      comprar.style,
      {

        width:
          "100%",

        height:
          "70px",

        marginTop:
          "20px",

        fontSize:
          "20px",

        padding:
          "15px 30px",

        boxSizing:
          "border-box"

      }
    );

  }

}