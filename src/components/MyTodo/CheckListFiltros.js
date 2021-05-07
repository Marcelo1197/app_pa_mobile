const { createElement } = React;
const html = htm.bind(createElement);

class CheckListFiltros extends React.Component {
  state = {
    filtros: [],
  };

  render() {
    return html` CheckItems para seleccionar filtros `;
  }
}

export default CheckListFiltros;
