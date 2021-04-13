const { createElement } = React;
const html = htm.bind(createElement);
var index = 0;

class Home extends React.Component {
  renderToolbar = (route, navigator) => {
    const backButton = route.hasBackButton
      ? html`<${Ons.BackButton}
          onClick=${this.handleClick.bind(this, navigator)}
        >
          Back
        <//>`
      : null;

    return html`<${Ons.Toolbar}>
      <div className="left">${backButton}</div>
      <div className="center">${route.title}</div>
    <//>`;
  };

  handleClick = (navigator) => {
    ons.notification
      .confirm("Do you really want to go back?")
      .then((response) => {
        if (response === 1) {
          navigator.popPage();
        }
      });
  };

  pushPage = (navigator) => {
    navigator.pushPage({
      title: `Another page ${index}`,
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
        <${Ons.Button} onClick=${this.pushPage.bind(this, navigator)}>
          Push Page
        <//>
      </section>
    <//>`;
  };

  render() {
    return html`<${Ons.Navigator}
      swipeable
      renderPage=${this.renderPage}
      initialRoute=${{
        title: "First page",
        hasBackButton: false,
      }}
    />`;
  }
}

export default Home;
