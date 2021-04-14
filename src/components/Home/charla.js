//INFO: conseguir el token de la app_podemosaprender con pantalla que pide usuario y clave
const { createElement } = React;
const html = htm.bind(createElement);
//A: definimos las funciones de react como requiere este runtime

import Toolbar from "../toolbar.js";
import TarjetaTexto from "./tarjetaTexto.js";

async function leerTextos(idCharla) {
  const res = await fetch(
    `https://si.podemosaprender.org/api/charla/${idCharla}`
  );
  return res;
}

class Charla extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textos: [] };
  }

  componentDidMount() {
    //A: En vez de 21 debería ir this.props.idCharla que recibiríamos como una prop
    const res = leerTextos(21)
      .then((text) => text.json())
      .then((text) => this.setState({ textos: text.textos }));
    //DBG:console.log(this.state);
  }

  render() {
    return html`
      <${Ons.Page} style=${{ display: "inline" }}>
        <${Toolbar} titulo="Titulo charla"><//>
        <${Ons.List} style=${{ marginTop: "3em" }}>
          ${this.state.textos.map(
            (
              //TODO: gusanito cuando esta cargando las charlas
              txt
            ) => html`<${TarjetaTexto} textoCharla=${txt}> <//>`
          )}
        <//>
      <//>
    `;
  }
}

export default Charla;
