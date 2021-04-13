const { createElement } = React;
const html = htm.bind(createElement);
var index = 0;

async function leerCharlas() {
  //A: utilizamos la libreria rest-api-token traer las charlass
  const res = await fetch("https://si.podemosaprender.org/api/charla/");
  return res;
}

class Home extends React.Component {
  state = {
    charlas: [],
  };

  componentDidMount() {
    leerCharlas()
      .then((charlas) => charlas.json())
      .then((charlas) => this.setState({ charlas }));
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

    return html`<${Ons.Toolbar}>
      <div className="left">${backButton}</div>
      <div className="center">${route.title}</div>
    <//>`;
  };

  handleClick = (navigator) => {
    ons.notification.confirm("¿Volver al inicio?").then((response) => {
      if (response === 1) {
        navigator.popPage();
      }
    });
  };

  pushPage = (navigator, charla) => {
    navigator.pushPage({
      title: `Charla ${charla.pk}`,
      hasBackButton: true,
    });

    index++;
  };

  renderPage = (route, navigator) => {
    return html`<${Ons.Page}
      key=${route.title}
      renderToolbar=${this.renderToolbar.bind(this, route, navigator)}
    >
      <section style=${{ margin: "16px", textAlign: "center" }}>
        <${Ons.List}>
          ${this.state.charlas.map((charla) => {
            return html`
              <${Ons.ListItem}>
                <a onClick=${this.pushPage.bind(this, navigator, charla)}>
                  ${charla.titulo}
                </a>
              <//>
            `;
          })}
        <//>
      </section>
    <//>`;
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
