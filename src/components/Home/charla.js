//INFO: conseguir el token de la app_podemosaprender con pantalla que pide usuario y clave
const { createElement } = React;
const html = htm.bind(createElement);
//A: definimos las funciones de react como requiere este runtime

import TarjetaTexto from "./tarjetaTexto.js";

async function leerTextos(idCharla) { //A: trae todos los textos de una charla
  const res = await fetchConToken( //A: funcion definida en auth-servicio para acceder a la API con un token
    `https://si.podemosaprender.org/api/charla/${idCharla}`
  );
  return res;
}

class Charla extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textos: [] };
  }

  componentDidMount() { //A: cuando componente montado trae textos y los setea al state
    const res = leerTextos(this.props.idCharla)
      .then((text) => text.json())
      .then((text) => this.setState({ textos: text.textos }));
    //DBG:console.log(res);
  }

  render() {
    return html`
      <${Ons.Page} style=${{ display: "inline" }}>
        <${Ons.List} style=${{ marginTop: "3em" }}>
          ${this.state.textos.map(
            ( //TODO: gusanito cuando esta cargando las charlas
              txt
            ) => html`<${TarjetaTexto} textoCharla=${txt}> <//>`
          )}
        <//>
      <//>
    `;
  }
}

export default Charla;
