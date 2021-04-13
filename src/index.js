const { createElement} = React;
const render = ReactDOM.render;
const html = htm.bind(createElement);

import App from './app.js';
import Textos from './textos.js'; 

render(html`<${Textos}/>`, document.getElementById("App"));

