//INFO: conseguir el token de la app_podemosaprender con pantalla que pide usuario y clave 
const { createElement} = React;
const html = htm.bind(createElement);
//A: definimos las funciones de react como requiere este runtime

import Toolbar from './toolbar.js';
import TarjetaCharla from './tarjetaCharla.js';

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

    charlaOk( pk ) {
        console.log(pk)
      this.props.cuandoOk(pk); //A: llama a cuandoOk en App para actualizar componente y definir que tab se muestra
    }

    render() {
        return html`
            <${Ons.Page}
                style=${{ display: "inline"}}>
                <${Toolbar} titulo="Charlas" ><//>
                <${Ons.List} style=${{ marginTop: "3em"}}>
                   
                <//>
            <//>
        `;
    }
}

export default Charlas ;
