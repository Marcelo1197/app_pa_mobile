const { createElement } = React;
const html = htm.bind(createElement);

import Page from "../Page.js";
import ListaActividades from "./ListaActividades.js";
import { fetchDataActividades } from "../../servicios/actividades.js";

class MyTodo extends React.Component {
  state = {
    actividades: [],
  };

  componentDidMount() {
    fetchDataActividades("data.json").then((actividades) => {
      console.info(actividades);
      this.setState({
        actividades: actividades,
      });
    });
  }

  render() {
    return html`<${Page}>
      <${ListaActividades} dataActividades=${this.state.actividades}><//>
    <//>`;
  }
}

export default MyTodo;
