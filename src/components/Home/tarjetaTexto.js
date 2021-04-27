//INFO:
import {
  filtrarCharlaPorNombre,
  charlas_fetch,
  charlas_sin_casuales,
  markdownAhtml,
  charlaConTitulo,
} from "../../servicios/charlas.js";

const { createElement } = React;
const html = htm.bind(createElement);

const handleHashtagClick = function (onclick) {
  return async (e) => {
    let hashtagClicked = e.target.innerHTML;
    let charlaMatcheada = await charlaConTitulo(hashtagClicked);
    onclick(charlaMatcheada);
    console.info(
      "el que disparo el click fue: ",
      hashtagClicked,
      charlaMatcheada
    );
  };
};

class TarjetaTexto extends React.Component {
  state = {
    texto: this.props.texto, //U: {texto: "", de_quien: ""}
    textLinks: this.props.texto.texto,
  };

  agregarOnClickHashtags() {
    //U: Cuando toque cualquier hashtag activa esa charla
    const onclick = this.props.onCharlaClick;
    console.info("tarjetaTexto/agregarOnClickHashtags");
    let listaHashtags = document.getElementsByClassName("hashtagLink");
    listaHashtags = [...listaHashtags];
    //DBG: console.info(listaHashtags);
    listaHashtags.forEach((hashtagLink) => {
      hashtagLink.onclick = handleHashtagClick(onclick);
    });
  }

  componentDidMount() {
    //DBG: console.info("tarjetaTexto.js/montaje");
    this.agregarOnClickHashtags();

    //Resultado: un array SOLO con las charlas (objetos) de la tarjetaTexto correspondiente ej: [{titulo: #titulo1, pk: 1}, {titulo: #titulo2, pk: 2}, {titulo: #titulo3, pk: 3}]
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.texto !== prevProps.texto) {
      //DBG: console.log("tarjetaTexto.js/actualizacion: se actualizo pq cambiaron los props");
      this.setState({
        texto: this.props.texto,
      });
    }
    if (this.state !== prevState) {
      //DBG: console.log("tarjetaTexto.js/actualización: se actualizo pq cambio el state");
    }
  }

  markdownAhtml(txt) {
    //U: Markdown a HTML para usar con dangerouslySetInnerHTML
    return { __html: marked(txt) };
  }

  render() {
    return html`
      <${Ons.Card}>
        <${Ons.ListItem} className="post-button-bar" modifier="nodivider">
          <div>
            <h4><b>Autor: ${this.state.texto.de_quien.username}</b></h4>
          </div>
          <div className="list-item__title">
            <p
              dangerouslySetInnerHTML=${markdownAhtml(this.state.textLinks)}
            ></p>
          </div>
          <div>
            <p>Creado: ${this.state.texto.fh_creado}</p>
          </div>
        <//>
      <//>
    `;
  }
}

export default TarjetaTexto;
