const { createElement } = React;
const html = htm.bind(createElement);

import Login from "./components/login.js";
import Home from "./components/Home/home.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  cuandoLoginOk(usuarioId) {
    //A: cuando el login  es correcto setea index y usuarioId para actualizar componente y definir que tab se va a mostrar
    this.setState({ index: 0, usuarioId });
  }

  renderTabs() {
    // A: contiene las tabs que se van a mostrar en Ons.Tabbar
    //A: El return va sin ` `. El formato htm ` ` solo se utiliza dentro de content y tab
    return [
      {
        content: html`<${Home} usuarioId="${this.state.usuarioId}" />`,
        tab: html`<${Ons.Tab} label="Charlas" icon="md-view-day" />`,
      },
    ];
  }
  //OK: Corregí el uso de la sintaxis HTM, anteriormente las backsticks ` ` encerraban a todo el código
  //incluido su parte lógica, por lo cual no se ejecutaba el condicional que dependía de this.state.usuarioId == null
  render() {
    return html`
      <${Ons.Page}>
        ${this.state.usuarioId == null //A: si usuarioId no esta creada renderiza Login, cuando login OK se crea usuarioId y se ejecuta la otra parte del condicional 
          ? html`<${Login} cuandoOk=${this.cuandoLoginOk.bind(this)}><//>`
          : html`<${Ons.Tabbar} 
              swipeable=${true}
              position="auto"
              index=${this.state.index}
              onPreChange=${(event) => {
                if (event.index != this.state.index) {
                  this.setState({ index: event.index });
                }
              }}
              renderTabs=${() => this.renderTabs()}
            >
            <//>`}
      <//>
    `;
  }
}

export default App;
