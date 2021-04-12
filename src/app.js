const { createElement } = React;
const html = htm.bind(createElement);

import Login from "./login.js";
import Charlas from "./charlas.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { index: 0 };
    }

    cuandoLoginOk(usuarioId) {
        //A: cuando el login  es correcto setea index y usuarioId para actualizar componente y definir que tab se va a mostrar
        this.setState({ index: 0, usuarioId });
    }

    renderTabs () {
        // A: contiene las tabs que se van a mostrar en Ons.Tabbar
        //A: El return iba sin ` `. El formato htm ` ` solo lo utilizo dentro de content y tab, porque es ahí donde quiero insertar
        //los elementos a renderizar.
        return [
            {
                content: html`<${Charlas}  usuarioId="${this.state.usuarioId}" />`,
                tab: html`<${Ons.Tab} label="Charlas" icon="md-view-day" />`,
            },
        ];
    };
    //OK: Corregí el uso de la sintaxis HTM, anteriormente las backsticks ` ` encerraban a todo el código
    //incluido su parte lógica, por lo cual no se ejecutaba el condicional que dependía de this.state.usuarioId == null
    render() {
        return html`
            <${Ons.Page}>
                ${this.state.usuarioId == null
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
                    <//>`
                }
            <//>
        `;
    }
}

export default App;
