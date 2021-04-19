const { createElement } = React;
const html = htm.bind(createElement);

class TarjetaTexto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: this.props.textoCharla,
      textLinks: this.props.textoCharla.texto,
    };
  }

  createMarkup() {
    //A: convierte markdown a html
    return { __html: marked(this.state.textLinks) };
  }

  agregarOnClickHashtags() {
    //A: Traigo todos los elementos <a> que tengan la clase hashtagLink. Me devuelve una HTMLCollection de elementos <a>
    let listaHashtags = document.getElementsByClassName("hashtagLink");
    //A: Transformo la HTMLCollection a un array
    listaHashtags = [...listaHashtags];
    //DBG: console.info(listaHashtags);
    //A: Itero el array de elementos <a> agregandole a cada uno un listener del evento click
    listaHashtags.forEach((hashtagLink) => {
      hashtagLink.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Apretaste un hashtag!");
      });
    });
  }

  componentDidMount() {
    //A: montado el componente llama a la función que crea los links
    console.info("componente tarjetaTexto fase montaje");
    //this.hashtagsALinks();
    this.agregarOnClickHashtags();
  }

  componentDidUpdate(prevProps, prevState) {
    //A: Si cambia por algún motivo el props que se le pasa a tarjeta, se actualiza el contenido
    if (this.props.textoCharla !== prevProps.textoCharla) {
      console.log("tarjetaTexto se actualizo pq cambiaron los props");
      this.setState({
        texto: this.props.textoCharla,
      });
    }
    if (this.state !== prevState) {
      console.log("tarjetaTexto se actualizo pq cambio el state");
      //this.agregarOnClickHashtags();
    }
  }

  render() {
    //A: usa el atributo dangerouslySetInnerHTML para insertar HTML
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
