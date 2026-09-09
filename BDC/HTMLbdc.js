/*
============================================================

BLOQUE DE COMPRA

============================================================
*/

export const HTMLbdc = `

<section
  id="bdc"
  class="bdc"
>


  <!--
  ==========================================================
  TITULO
  ==========================================================
  -->

  <div
    class="bdc-titulo"
  >

    <div>
      Tipo
    </div>

    <div>
      Valor
    </div>

    <div>
      Cantidad
    </div>

  </div>


  <!--
  ==========================================================
  FILAS DE TICKETS

  JavaScript las generará dentro de este contenedor.
  ==========================================================
  -->

  <div
    id="bdcTickets"
    class="bdc-tickets"
  ></div>


  <!--
  ==========================================================
  BOTON COMPRAR
  ==========================================================
  -->

  <button
    id="comprarBtn"
    class="evento-buy-btn"
    type="button"
  >
    Comprar entrada
  </button>


</section>

`;
