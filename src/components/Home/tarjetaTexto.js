const { createElement } = React;
const html = htm.bind(createElement);

class TarjetaTexto extends React.Component {
  constructor(props) {
    super(props);
    this.state = { texto: this.props.textoCharla , textLinks: ''};
  }


  hashtagsALinks() { //A: reemplazo '#tag' por el mismo '#tag' entre etiquetas <a></a> para convertirlos en links
    const textLinks = this.props.textoCharla.texto.replace(
       /#([A-Za-z0-9_]+)/g, this.creaLink 
    )
    //DBG:console.log(textLinks)
    this.setState({textLinks})
  }

  creaLink(hashtag) {
    //TODO: agregar evento onclick para poder mostrar los textos de la charlaLink que aparece en el texto
    //A: solo convierte en link cuando se coloca 'href', pero de esta manera me lleva a la pantalla inicial
    return `<a href="" > ${hashtag} </a>`;
  }		
  
  createMarkup () { //A: convierte markdown a html
    return {__html: marked(this.state.textLinks)};
  }

  componentDidMount() { //A: montado el componente llama a la función que crea los links
    this.hashtagsALinks(); 
  }

  componentDidUpdate(prevProps) {
    //A: Si cambia por algún motivo el props que se le pasa a tarjeta, se actualiza el contenido
    if (this.props.textoCharla !== prevProps.textoCharla) {
      this.setState({
        texto: this.props.textoCharla,
      });
    }
  }

  render() { //A: usa el atributo dangerouslySetInnerHTML para insertar HTML 
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


