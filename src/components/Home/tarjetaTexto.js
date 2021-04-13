const { createElement } = React;
const html = htm.bind(createElement);

class TarjetaTexto extends React.Component {
  constructor(props) {
    super(props);
    this.state = { texto: this.props.textoCharla };
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
            <h4>Autor: ${this.state.texto.de_quien.username}</h4>
          </div>
          <div className="list-item__title">
            <b>${this.state.texto.texto}</b>
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
