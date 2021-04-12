//INFO: conseguir el token de la app_podemosaprender con pantalla que pide usuario y clave 
const { createElement} = React;
const html = htm.bind(createElement);
//A: definimos las funciones de react como requiere este runtime

import Toolbar from './toolbar.js';

async function leerCharlas () { //A: utilizamos la libreria rest-api-token traer las charlass
    const res = await fetchConToken('https://si.podemosaprender.org/api/charla/');
    return res;
}

class Charlas extends React.Component {
    constructor(props) {
        super(props);
        this.state = { charlas: [] };
    }

    async componentDidMount() { //Q: esta bien hacer async a ComDidMou?
        const res = await leerCharlas();
        const charlas = await res.json();
        const charlasFilt = charlas.filter( //A: filtra charlas que comienzan con '#casual'
            charla => !charla.titulo.startsWith('#casual')
        );
        this.setState({charlas: charlasFilt});
        //DBG:console.log(this.state.charlas);
    }

    render() {
        return html`
            <${Ons.Page}
                style=${{ display: "inline" }}>
                <${Toolbar} titulo="Charlas" ><//>
                <${Ons.List}>
                    ${this.state.charlas.map(( //TODO: gusanito cuando esta cargando las charlas
                        char
                        ) => (
                            html`<${Ons.ListItem} key=${char.pk}>
                                ${char.titulo}
                            <//>`
                        ))
                    }
                <//>
            <//>
        `;
    }
}

export default Charlas ;
