const { createElement} = React;
const html = htm.bind(createElement);

import Login from './login.js'; 

class App extends React.Component {
	render() {
		return html`
            <div>
            <${Login}><//>
            </div>
        `;
	}
}

export default App;


