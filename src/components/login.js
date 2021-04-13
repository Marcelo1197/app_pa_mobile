//INFO: conseguir el token de la app_podemosaprender con pantalla que pide usuario y clave
const { createElement } = React;
const html = htm.bind(createElement);
//A: definimos las funciones de react como requiere este runtime

import Toolbar from "./toolbar.js";

var idUsuarioLogeado = null;

async function loginClave(usr, pass) {
  //A: utilizamos la libreria rest-api-token para logearse en la API de Podemos Aprender
  const res = await apiLogin(usr, pass);
  return res;
}

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
    //A: llama la funcion que utiliza la libreria api-rest-token y le pasa valores ingresados en el form.
    //Según respuesta notifica error o bienvenida
    //MEJORA: lo pase a async/await en vez de promesas que es mas facil de leer
    const res = await loginClave(
      this.state.nombreusuario,
      this.state.contraseña
    );
    //DBG:console.log('iniciarSesion', this.state, res)
    if (this.state.contraseña == "" || this.state.nombreusuario == "") {
      ons.notification.alert("Debe completar los dos campos");
    } else if (
      res.detail === "No active account found with the given credentials"
    ) {
      ons.notification.alert("Usuario o contraseña incorrecto!");
    } else {
      idUsuarioLogeado = 1; //A: usuario logeado correctamente
      this.props.cuandoOk(idUsuarioLogeado); //A: llama a cuandoOk en App para actualizar componente y definir que tab se muestra
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
    //MEJORA: cambie onClick=${this.iniciarSesion} por onClick=${() => this.iniciarSesion()}
    //Es algo ODIOSO de este javascript moderno, en la primera iniciarSesion es solo un valor y te va a decir que "this is undefined"
  }
}

export default Login;
