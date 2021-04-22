const { createElement } = React;
const html = htm.bind(createElement);

import Login from "./components/login.js";
import Home from "./components/Home/home.js";

const NECESITA_LOGIN= {}; //U: un valor UNICO para no confundir con ningun otro
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  cuandoLoginOk(usuarioId) {
    this.setState({ index: 0, usuarioId });
  }

  renderTabs() { //U: lista de tabs que se van a mostrar en Ons.Tabbar
    //A: El return va sin ` `. El formato htm ` ` solo se utiliza dentro de content y tab
    return [
      {
        content: html`<${Home} usuarioId="${this.state.usuarioId}" />`,
        tab: html`<${Ons.Tab} label="Charlas" icon="md-view-day" />`,
      },
    ];
  }

  render() {
		if (this.state.usuarioId == null) { //A: primera vez
			apiNecesitoLoginP() //A: averiguar si token sirve o necesitamos login (async)
				.then( necesitoLogin => this.setState({ 
						usuarioId: necesitoLogin ? NECESITA_LOGIN : usuarioLeer()
					}));
			//A: mientras, mostrar cartelito de espera
			return html`
      	<${Ons.Page}>
				Verificando credenciales
				<//>
				`;
		}
		else if (this.state.usuarioId == NECESITA_LOGIN) {
			return html`
				<${Ons.Page}>
					 <${Login} cuandoOk=${this.cuandoLoginOk.bind(this)}><//>
				<//>
				`;
		}
		else {
			return html`
				<${Ons.Page}>
					<${Ons.Tabbar} 
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
						<//>
				<//>`;
		}
  }
}

export default App;
