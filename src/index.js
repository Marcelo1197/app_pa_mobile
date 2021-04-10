const { createElement} = React;
const render = ReactDOM.render;
const html = htm.bind(createElement);

import App from './app.js'; 

render(html`<${App}/>`, document.getElementById("App"));

