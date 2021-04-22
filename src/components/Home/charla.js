//INFO: conseguir el token de la app_podemosaprender con pantalla que pide usuario y clave
const { createElement } = React;
const html = htm.bind(createElement);
//A: definimos las funciones de react como requiere este runtime

import TarjetaTexto from "./tarjetaTexto.js";

async function fetch_textosCharla(idCharla) { //U: trae todos los textos de una charla
	console.log("fetch_textosCharla", idCharla);
  const res = await fetchConToken(
    //A: funcion definida en auth-servicio para acceder a la API con un token
    `https://si.podemosaprender.org/api/charla/${idCharla}`
  );
  return res;
}

function linkParaHashtag(hashtag) { 
	return `<a href="#" class="hashtagLink"> ${hashtag} </a>`;
	//A: agrego la class "hashtagLink" para referenciarla en agregarOnClickHashtags()
}

function hashtagsALinks(textosCharla) {
    //A: Recorro cada texto de la charla renderizada
    //Y reemplazo cada '#tag' por el mismo '#tag' entre etiquetas <a></a> para poder clickearlos
    textosCharla.forEach((textoItem) => {
      textoItem.texto = textoItem.texto.replace(
        /#([A-Za-z0-9_]+)/g,
        linkParaHashtag
      );
    });
    //DBG:console.info(textosCharla);
    return textosCharla;
}

async function obtenerTextosDeCharla(charla) {
	const res = await fetch_textosCharla(charla);
	const data = await res.json();
	//A: Paso como parámetro la lista de textos de la charla correspondiente a funcion hashtagsALinks()
	const textosConHashtagsLinks = hashtagsALinks(data.textos);
	//DBG: console.info("charla.js/obtenerTextosDeCharla ejecutado");
	return textosConHashtagsLinks;	
};

class Charla extends React.Component {
  state = { listaTextos: [] };

  componentDidMount() {
    //A: cuando componente montado trae textos y los setea al state
    //DBG: 
		console.log("charla.js/montaje", this.props);
    obtenerTextosDeCharla(this.props.idCharla)
			.then(listaTextos => this.setState({ listaTextos }));
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
