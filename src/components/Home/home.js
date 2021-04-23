const { createElement } = React;
const html = htm.bind(createElement);

import Charla from "./charla.js";

async function charlas_fetch() { //U: fetch usando rest-api-token para traer las charlas
	const res = await fetchConToken("https://si.podemosaprender.org/api/charla/");
	return res;
}

async function charlas_sin_casuales() { //U: trae charlas, excluye las que empiezan con #casual (muchas)
	const res = await charlas_fetch();
	const charlas = await res.json();
	const charlasFiltradas = charlas.filter(
		(charla) => !charla.titulo.startsWith("#casual")
	);
	//DBG: console.info("home.js/obtenerYfiltrarCharlas ejecutado");
	return charlasFiltradas;	
};

class Home extends React.Component {
	state = {
		charlas: [],
	};

	componentDidMount() {
		//DBG: console.info("home.js/montaje");
		charlas_sin_casuales().then( charlas => this.setState({ charlas }) );
	}

	onVolverClick = (navigator) => { //U: click en "volver" quita la página de textos del navigator
		navigator.popPage();
		this.setState({ idCharla: null }); //A: cuando se aprieta volver setea state y renderiza de nuevo la lista de charlas
	};

	renderToolbar = (route, navigator) => { //U: barra superior con o sin boton volver según hasBackButton=true/false
		const backButton = route.hasBackButton
			? html`<${Ons.BackButton}
					onClick=${this.onVolverClick.bind(this, navigator)}
				>
					Volver
				<//>`
			: null;
		return html`<${Ons.Toolbar} style=${{ backgroundColor: "gray" }}>
			<div className="left">${backButton}</div>
			<div className="center">${route.title}</div>
		<//>`;
	};


	pushPage = (navigator, charla) => { //U: Agrego un parámetro extra 'charla', para setear pk y pasarlo por props a componente Charla
		console.log("pushPage",charla);
		navigator.pushPage({
			title: charla.titulo,
			charla_pk: charla.pk,
			hasBackButton: true,
		});
	};

	renderListaDeCharlas= (route, navigator) => { //U: muestro lista de charlas, si elige una hago pushPage
		return html`
			<${Ons.Page}
				 key=${route.title}
				 renderToolbar=${this.renderToolbar.bind(this, route, navigator)}
			>
				<section style=${{ margin: "16px", textAlign: "center" }}>
					<${Ons.List}>
						${this.state.charlas.map( (charla) => {
							return html`
								<${Ons.ListItem} key=${charla.pk}>
									<a onClick=${() => this.pushPage(navigator, charla)}>
										${charla.titulo}
									</a>
								<//>
							`;
						})}
					<//>
				</section>
			<//>
			`;
	};

	renderPage = (route, navigator) => { //U: la pagina que pida la RUTA (no state!)
		console.log("renderPage ", route);

		if (route.title == "Charlas") {
			return this.renderListaDeCharlas(route, navigator);
		}
		else {
			const idCharla= route.charla_pk; //A: usar la de la RUTA, no state
			return html`
				<${Ons.Page}
				 	key=${route.title}
					renderToolbar=${this.renderToolbar.bind(this, route, navigator)}
				>
					<${Charla} idCharla=${idCharla}><//>
				<//>
			`;
		}
	};

	render() {
		return html`<${Ons.Navigator}
			key="navigator"
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
