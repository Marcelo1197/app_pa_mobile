const { createElement } = React;
const render = ReactDOM.render;
const html = htm.bind(createElement);

import App from "./app.js";
import Charla from "./components/Home/charla.js";
import Home from "./components/Home/home.js";

render(html`<${Home} />`, document.getElementById("App"));
