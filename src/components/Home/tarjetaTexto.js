const { createElement } = React;
const html = htm.bind(createElement);

class TarjetaTexto extends React.Component {
  constructor(props) {
    super(props);
    this.state = { texto: this.props.textoCharla };
  }

  createMarkup () { //A: convierte markdown a html
    return {__html: marked(this.state.texto.texto)};
  }

  componentDidUpdate(prevProps) {
    //A: Si cambia por algún motivo el props que se le pasa a tarjeta, se actualiza el contenido
    if (this.props.textoCharla !== prevProps.textoCharla) {
      this.setState({
        texto: this.props.textoCharla,
      });
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
