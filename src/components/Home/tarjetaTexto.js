//INFO:
import {
  filtrarCharlaPorNombre,
  traerTodosLosHashtags,
  obtenerObjetosCharlas,
  traerCharlasDelTexto,
  charlas_fetch,
  charlas_sin_casuales,
} from "../../servicios/charlas.js";

const { createElement } = React;
const html = htm.bind(createElement);

class TarjetaTexto extends React.Component {
  state = {
    texto: this.props.texto,
    textLinks: this.props.texto.texto,
  };

  createMarkup() {
    return { __html: marked(this.state.textLinks) };
  }

  agregarOnClickHashtags(opciones) {
    //U: Cuando toque cualquier hashtag activa esa charla
    let { navigator, route, pushPage, charlasFetch } = opciones;
    console.info("tarjetaTexto/agregarOnClickHashtags");
    let listaHashtags = document.getElementsByClassName("hashtagLink");
    listaHashtags = [...listaHashtags];
    //DBG: console.info(listaHashtags);
    listaHashtags.forEach((hashtagLink) => {
      hashtagLink.onclick = (e) => {
        let hashtagClicked = e.target.innerHTML;
        let charlaMatcheada;
        this.state.objetosCharla.forEach((charla) => {
          if (charla.titulo == hashtagClicked) {
            charlaMatcheada = charla;
          }
        });
        pushPage(navigator, charlaMatcheada);
        console.info("el que disparo el click fue: ", hashtagClicked);
      };
    });
  }

  componentDidMount() {
    //DBG: console.info("tarjetaTexto.js/montaje");
    const datosProps = this.props.tarjetaTextoProps;
    const vincularHashtagConCharla = async () => {
      traerCharlasDelTexto(charlas_fetch)
        .then((charlas) => this.setState({ objetosCharla: charlas }))
        .then(() => {
          this.agregarOnClickHashtags(this.props.tarjetaTextoProps);
        });
    };
    vincularHashtagConCharla();

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

  render() {
    return html`
      <${Ons.Card}>
        <${Ons.ListItem} className="post-button-bar" modifier="nodivider">
          <div>
            <h4><b>Autor: ${this.state.texto.de_quien.username}</b></h4>
          </div>
          <div className="list-item__title">
            <p dangerouslySetInnerHTML=${this.createMarkup()}></p>
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
