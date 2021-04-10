//INFO: asi usamos onsen con html
const { createElement} = React;
const html = htm.bind(createElement);
//A: definimos las funciones de react como requiere este runtime

async function loginClave (usr, pass) {
  const res = await apiLogin( usr, pass );
  return res;
}

//VER: https://github.com/developit/htm
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nombreusuario: "", contraseña: ""  };
  }

  setNombre(value) {
    this.setState({nombreusuario: value});
    console.log(this.nombreusuario)
  }

  setContraseña(value) {
    this.setState({contraseña: value});
    console.log(this.contraseña)
  }

  iniciarSesion() {
    console.log(this.state)
    loginClave(this.state.nombreusuario, this.state.contraseña)
      .then((res) => {
        if (res.detail === "No active account found with the given credentials") {
          ons.notification.alert("Usuario o contraseña incorrecto!");
        } else {
          ons.notification.alert("Bienvenido!");  
          //DBG:console.log(res)
        }
      }) 
    
  }

  renderToolbar() {
    return html`
      <${Ons.Toolbar}>
        <div className='center'>Iniciar sesion</div>
      <//>
    `;
  }

  render() {
    return html`
        <${Ons.Page} renderToolbar=${this.renderToolbar}
        style=${{ display: "inline" }}>
        <section style=${{ textAlign: "center" }}>
          <p>
            <${Ons.Input}
              value=${this.state.nombreusuario}
              onChange=${e => {
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
              onChange=${e => {
                this.setContraseña(e.target.value);
              }}
              modifier="underbar"
              type="password"
              float
              placeholder="Contraseña"
            />
          </p>
          <p>
            <${Ons.Button} onClick=${this.iniciarSesion}>Entrar<//>
          </p>
        </section>
      <//>
  `;
	}
}

export default Login ;
