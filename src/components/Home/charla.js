//INFO: conseguir el token de la app_podemosaprender con pantalla que pide usuario y clave
const { createElement } = React;
const html = htm.bind(createElement);
//A: definimos las funciones de react como requiere este runtime

import TarjetaTexto from "./tarjetaTexto.js";

async function leerTextosCharla(idCharla) {
  //A: trae todos los textos de una charla
  const res = await fetchConToken(
    //A: funcion definida en auth-servicio para acceder a la API con un token
    `https://si.podemosaprender.org/api/charla/${idCharla}`
  );
  return res;
}

class Charla extends React.Component {
  state = { listaTextos: [] };

  hashtagsALinks(listaTextos) {
    let textosCharla = listaTextos;
    //A: Recorro cada texto de la charla renderizada
    //Y reemplazo cada '#tag' por el mismo '#tag' entre etiquetas <a></a> para poder clickearlos
    textosCharla.forEach((textoItem) => {
      textoItem.texto = textoItem.texto.replace(
        /#([A-Za-z0-9_]+)/g,
        this.creaLink
      );
    });
    //DBG:console.info(textosCharla);
    return textosCharla;
  }

  creaLink(hashtag) {
    //A: agrego la class "hashtagLink" para referenciarla en agregarOnClickHashtags()
    return `<a href="#" class="hashtagLink"> ${hashtag} </a>`;
  }

  componentDidMount() {
    //A: cuando componente montado trae textos y los setea al state
    //DBG: console.log("charla.js/montaje");
    const obtenerTextosDeCharla = async () => {
      const res = await leerTextosCharla(this.props.idCharla);
      const data = await res.json();
      //A: Paso como parámetro la lista de textos de la charla correspondiente a funcion hashtagsALinks()
      const textosConHashtagsLinks = this.hashtagsALinks(data.textos);
      //DBG: console.info("charla.js/obtenerTextosDeCharla ejecutado");
      this.setState({ listaTextos: textosConHashtagsLinks });
    };
    obtenerTextosDeCharla();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      //DBG: console.info("charla.js/actualizacion: cambiaron props");
    }
    if (this.state !== prevState) {
      //DBG: console.info("charla.js/actualizacion: cambiaro state");
    }
  }
  render() {
    return html`
      <${Ons.Page} style=${{ display: "inline" }}>
        <${Ons.List} style=${{ marginTop: "3em" }}>
          ${this.state.listaTextos.length === 0
            ? "Cargando..."
            : this.state.listaTextos.map(
                (txt) =>
                  html`<${TarjetaTexto} key=${txt.pk} textoCharla=${txt}> <//>`
              )}
        <//>
      <//>
    `;
  }
}

export default Charla;
