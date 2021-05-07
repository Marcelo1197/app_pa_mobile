const { createElement } = React;
const html = htm.bind(createElement);

export default function Page(props) {
  const renderToolbar = () => {
    return html`
      <${Ons.Toolbar}>
        <div className="center">My ToDo</div>
        <div className="right">
          <${Ons.ToolbarButton}>
            <${Ons.Icon} icon="ion-ios-menu, material:md-menu"><//>
          <//>
        </div>
      <//>
    `;
  };

  return html` <${Ons.Page} renderToolbar=${renderToolbar}>
    <div style=${{ textAlign: "center" }}>${props.children}</div>
  <//>`;
}
