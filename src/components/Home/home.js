const { createElement } = React;
const html = htm.bind(createElement);

import Charla from './charla.js';

async function leerCharlas() {
  //A: utilizamos la libreria rest-api-token traer las charlass
  const res = await fetch("https://si.podemosaprender.org/api/charla/");
  return res;
}

class Home extends React.Component {
  state = {
    charlas: [],
  };

  //A: Traigo las charlas de la API en formato json y seteo mi state con el array de objetos (charlas) que obtengo
  componentDidMount() {
    leerCharlas()
      .then((charlas) => charlas.json())
      .then((charlas) => this.setState({ charlas })); //TODO: filtrar charlas que epiezan con #casual
    //DBG:console.log(this.state);
  }

  renderToolbar = (route, navigator) => {
    const backButton = route.hasBackButton
      ? html`<${Ons.BackButton}
          onClick=${this.handleClick.bind(this, navigator)}
        >
          Volver
        <//>`
      : null;

    return html`<${Ons.Toolbar} style=${{backgroundColor: "gray"}}>
      <div className="left">${backButton}</div>
      <div className="center">${route.title}</div>
    <//>`;
  };

  //A: Cambio a español el diálogo que nos aparece al apretar el botón volver
  handleClick = (navigator) => {
        navigator.popPage();
        this.setState({idCharla: null}) //A: cuando se aprieta volver setea state y renderiza de nuevo la lista de charlas
  };

  //A: Agrego un parámetro extra, una charla, para poder mostrar el pk de esa charla cuando clickeemos en ella
  pushPage = (navigator, charla) => {
    this.setState({idCharla: charla.pk})
    navigator.pushPage({
      title: `${charla.titulo}`,
      hasBackButton: true,
    });
  };

  //A: Mapeo mi array de charlas y devuelvo cada una como un Ons.ListItem dentro de una Ons.List
  renderPage = (route, navigator) => {
    return html`
      ${ this.state.idCharla == null //A: condicional para mostrar la lista de charlas si idCharla es null, sino muestra textos de la charla que se clickea
        ? html`<${Ons.Page}
            key=${route.title}
            renderToolbar=${this.renderToolbar.bind(this, route, navigator)}
          >
            <section style=${{ margin: "16px", textAlign: "center" }}>
              <${Ons.List}>
                ${this.state.charlas.map((charla) => {
                  return html`
                    <${Ons.ListItem} key=${charla.pk}>
                      <a onClick=${this.pushPage.bind(this, navigator, charla)}>
                        ${charla.titulo}
                      </a>
                    <//>
                  `;
                })}
              <//>
            </section>
          <//>`
        : html`<${Ons.Page} 
            renderToolbar=${this.renderToolbar.bind(this, route, navigator)}
            >
                <${Charla} idCharla=${this.state.idCharla}><//>
            <//>`
      }
    `;
  };

  render() {
    return html`<${Ons.Navigator}
      swipeable
      renderPage=${this.renderPage}
      initialRoute=${{
        title: "Home",
        hasBackButton: false,
      }}
    />`;
  }
}

export default Home;
