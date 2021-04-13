const { createElement } = React;
const html = htm.bind(createElement);
import Toolbar from "./toolbar.js";

function Layout(props) {
  return html`
    <${React.Fragment}>
      <${Toolbar}> <//>
      ${props.children}
    <//>
  `;
}
