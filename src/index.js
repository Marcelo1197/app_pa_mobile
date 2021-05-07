const { createElement } = React;
const render = ReactDOM.render;
const html = htm.bind(createElement);

import App from "./app.js";
import MyTodo from "./components/MyTodo/MyTodo.js";

render(html`<${MyTodo} />`, document.getElementById("App"));
