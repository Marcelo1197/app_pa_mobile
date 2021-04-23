//INFO: conseguir el token de la app_podemosaprender con pantalla que pide usuario y clave
const { createElement } = React;
const html = htm.bind(createElement);
//A: definimos las funciones de react como requiere este runtime

import Toolbar from "./toolbar.js";



class Login extends React.Component {
  //A: componente react que genera  la vista donde se inicia sesion con usuario y clave
  constructor(props) {
    super(props);
    this.state = { nombreusuario: "", contraseña: "" };
  }

  setNombre(value) {
    this.setState({ nombreusuario: value });
  }

  setContraseña(value) {
    this.setState({ contraseña: value });
  }

  async iniciarSesion() {
    //U: llama la funcion que utiliza la libreria api-rest-token y le pasa valores ingresados en el form.
    //Según respuesta notifica error o bienvenida
    if (this.state.contraseña == "" || this.state.nombreusuario == "") {
      ons.notification.alert("Debe completar los dos campos");
    }
		else {
			const res = await apiLogin(
				this.state.nombreusuario,
				this.state.contraseña
			);
    //DBG:console.log('iniciarSesion', this.state, res)
			if (
				res.detail === "No active account found with the given credentials"
			) {
				ons.notification.alert("Usuario o contraseña incorrecto!");
			} else {
				this.props.cuandoOk(1); //A: llama a cuandoOk en App para actualizar componente y definir que tab se muestra
			}
		}
  }

  render() {
    //TODO: poner estilos en style.css
    return html`
      <${Ons.Page} style=${{ display: "inline" }}>
        <${Toolbar} titulo="Podemos Aprender"><//>
        <section style=${{ textAlign: "center", marginTop: "5em" }}>
          <p>
            <${Ons.Input}
              value=${this.state.nombreusuario}
              onChange=${(e) => {
                this.setNombre(e.target.value);
              }}
              modifier="underbar"
              float
              placeholder="Usuario"
            />
          </p>
          <p>
            <${Ons.Input}
              value=${this.state.contraseña}
              onChange=${(e) => {
                this.setContraseña(e.target.value);
              }}
              modifier="underbar"
              type="password"
              float
              placeholder="Contraseña"
            />
          </p>
          <p>
            <${Ons.Button} onClick=${() => this.iniciarSesion()}>Entrar<//>
          </p>
        </section>
      <//>
    `;
  }
}

export default Login;
