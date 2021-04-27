//INFO: conseguir el token de la app_podemosaprender con pantalla que pide usuario y clave
const { createElement } = React;
const html = htm.bind(createElement);
//A: definimos las funciones de react como requiere este runtime
import TarjetaTexto from "./tarjetaTexto.js";
import {
  fetch_textosCharla,
  linkParaHashtag,
  hashtagsALinks,
  obtenerTextosDeCharla,
} from "../../servicios/charlas.js";

class Charla extends React.Component {
  state = { listaTextos: [] };

  componentDidMount() {
    //A: cuando componente montado trae textos y los setea al state
    //DBG:
    console.log("charla.js/montaje", this.props);
    obtenerTextosDeCharla(this.props.idCharla).then((listaTextos) =>
      this.setState({ listaTextos })
    );
  }

  render() {
    return html`
      <${Ons.Page} style=${{ display: "inline" }}>
        <${Ons.List} style=${{ marginTop: "3em" }}>
          ${this.state.listaTextos.length === 0
            ? "Cargando..."
            : this.state.listaTextos.map(
                (txt) =>
                  html`<${TarjetaTexto}
                    key=${txt.pk}
                    texto=${txt}
                    tarjetaTextoProps=${this.props.tarjetaTextoProps}
                  >
                  <//>`
              )}
        <//>
      <//>
    `;
  }
}

export default Charla;
