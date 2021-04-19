const { createElement } = React;
const html = htm.bind(createElement);

import Charla from "./charla.js";

async function leerCharlas() {
  //A: utilizamos la libreria rest-api-token para traer las charlass
  const res = await fetchConToken("https://si.podemosaprender.org/api/charla/");
  return res;
}

class Home extends React.Component {
  state = {
    charlas: [],
  };

  componentDidMount() {
    const obtenerYfiltrarCharlas = async () => {
      const res = await leerCharlas();
      const charlas = await res.json();
      const charlasFilt = charlas.filter(
        //A: filtra charlas que comienzan con '#casual'
        (charla) => !charla.titulo.startsWith("#casual")
      );
      this.setState({ charlas: charlasFilt });
    };
    obtenerYfiltrarCharlas();
    //DBG:console.log(this.state.charlas);
  }

  renderToolbar = (route, navigator) => {
    // A: renderiza barra superior  con o sin boton volver según hasBackButton=true/false
    const backButton = route.hasBackButton
      ? html`<${Ons.BackButton}
          onClick=${this.handleClick.bind(this, navigator)}
        >
          Volver
        <//>`
      : null;
    return html`<${Ons.Toolbar} style=${{ backgroundColor: "gray" }}>
      <div className="left">${backButton}</div>
      <div className="center">${route.title}</div>
    <//>`;
  };

  handleClick = (navigator) => {
    //A: click en "volver" quita la página de textos del navigator
    navigator.popPage();
    this.setState({ idCharla: null }); //A: cuando se aprieta volver setea state y renderiza de nuevo la lista de charlas
  };

  //A: Agrego un parámetro extra 'charla', para setear pk y pasarlo por props a componente Charla
  pushPage = (navigator, charla) => {
    this.setState({ idCharla: charla.pk });
    navigator.pushPage({
      title: `${charla.titulo}`,
      hasBackButton: true,
    });
  };

  //A: Mapeo mi array de charlas y devuelvo cada una como un Ons.ListItem dentro de una Ons.List
  renderPage = (route, navigator) => {
    return html`
      ${this.state.idCharla == null //A: condicional para mostrar la lista de charlas si idCharla es null, sino muestra textos de la charla que seleccionada
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
            <${Charla}
              idCharla=${this.state.idCharla}
              charlas=${this.state.charlas}
            ><//>
          <//>`}
    `;
  };

  render() {
    return html`<${Ons.Navigator}
      swipeable
      renderPage=${this.renderPage}
      initialRoute=${{
        title: "Charlas",
        hasBackButton: false,
      }}
    />`;
  }
}

export default Home;
