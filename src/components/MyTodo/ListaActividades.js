const { createElement } = React;
const html = htm.bind(createElement);

export default function ListaActividades(props) {
  const actividades = props.dataActividades;

  return html`
    <h1>Mis actividades</h1>
    <${Ons.List}>
      ${actividades.map(
        (dataActividad, index) =>
          html`<${Ons.Card} key=${index}>
            <p><strong>Actividad:</strong> ${dataActividad.texto}</p>
            <p>
              <strong>Tiempo requerido: </strong>
              ${dataActividad.tiempo}
            </p>
            <div className="cardActividad__recursosNecesarios">
              <h5>¿Qué necesito?</h5>
              <div>
                ${dataActividad.necesito.map((recursoNecesario) =>
                  recursoNecesario.valor
                    ? html`<p>
                        <strong>${recursoNecesario.recurso}: </strong>Si
                      </p>`
                    : html`<p>
                        <strong>${recursoNecesario.recurso}: </strong>No
                      </p>`
                )}
              </div>
            </div>
          <//>`
      )}
    <//>
  `;
}
