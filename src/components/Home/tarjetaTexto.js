const { createElement } = React;
const html = htm.bind(createElement);

async function filtrarCharlaPorNombre(nombreCharla, charlasFetch) {
  //DBG: console.log("nombreCharla que recibi:" + nombreCharla);
  //A: Traigo todas las charlas de la API con charlasFetch
  const charlaMatcheada = await charlasFetch()
    .then((res) => res.json())
    .then((charlas) =>
      //A: Obtengo un array con la charla que quiero, matcheando el titulo de cada charla recorrida con nombreCharla
      charlas.filter((charla) => charla.titulo == nombreCharla)
    );
  //DBG: console.log("charla matcheada ", charlaMatcheada);
  //A: Como solo hay una charla con ese nombre, retorno la unica posicion de mi array que contiene la charla
  return charlaMatcheada[0];
}

function traerTodosLosHashtags() {
  //A: Traigo todos los elementos <a> que tengan la clase hashtagLink. Me devuelve una HTMLCollection de elementos <a>
  let listaHashtags = document.getElementsByClassName("hashtagLink");
  //A: Transformo la HTMLCollection a un array
  listaHashtags = [...listaHashtags];
  return listaHashtags;
}

function obtenerObjetosCharlas(charlasTraidasApi, listaHashtags) {
  //A: Mapeo cada #tituloHashtag de la lista de titulos que recibo como parametro
  let charlasMatcheadas = listaHashtags.map((tituloHashtag) => {
    let charlaMatcheada;
    //A: A su vez en cada mapeo de un titulo, recorro las charlasTraidasApi que recibomo como parametro
    charlasTraidasApi.forEach((charla) => {
      if (charla.titulo == tituloHashtag) {
        //A: Y en cada recorrida valido si el titulo de la charlaTraidaApi coincide con el titulo de mi listaHashtags mapeado
        //Si coincide lo asigno a mi variable aux charlaMatcheada
        charlaMatcheada = charla;
      }
    });
    //A: Y la devuelvo en el return del map
    return charlaMatcheada;
  });
  //A: Devuelvo la lista de charlas (objetos) que matchearon con los hashtags
  return charlasMatcheadas;
}

async function traerCharlasDelTexto(charlasFetch) {
  let listaHashtags = traerTodosLosHashtags();
  listaHashtags = listaHashtags.map((anchorElement) => anchorElement.innerHTML);
  //A: Traigo TODAS las charlas de la API
  let res = await charlasFetch();
  let charlasTraidasApi = await res.json();
  //A: Paso mis charlasTraidasApi y mi listaHashtags como parametros de obtenerObjetosCharlas()
  let charlasMatcheadas = obtenerObjetosCharlas(
    charlasTraidasApi,
    listaHashtags
  );
  //DBG: console.info("Titulos (strings) de las charlas: ", listaHashtags);
  //DBG: console.info("Objetos de esas charlas:", charlasMatcheadas);
  return charlasMatcheadas;
}

class TarjetaTexto extends React.Component {
  state = {
    texto: this.props.textoCharla,
    textLinks: this.props.textoCharla.texto,
  };

  createMarkup() {
    //A: convierte markdown a html
    return { __html: marked(this.state.textLinks) };
  }

  agregarOnClickHashtags(opciones) {
    //A: Desestructuro los datos y funciones pasado como prop desde home.js
    let { navigator, route, pushPage, charlasFetch } = opciones;
    console.info("tarjetaTexto/agregarOnClickHashtags");
    //A: Traigo todos los elementos <a> que tengan la clase hashtagLink. Me devuelve una HTMLCollection de elementos <a>
    let listaHashtags = document.getElementsByClassName("hashtagLink");
    //A: Transformo la HTMLCollection a un array
    listaHashtags = [...listaHashtags];
    //DBG: console.info(listaHashtags);
    //A: Itero el array de elementos <a> agregandole a cada uno un .onclick
    listaHashtags.forEach((hashtagLink) => {
      //A: En vez de addEventListener, asigno el evento .onclick a cada <a>
      hashtagLink.onclick = (e) => {
        //A: Guardo el nombre del hashtag clickeado
        let hashtagClicked = e.target.innerHTML;
        //A: Obtengo la charla (objeto) que clickee, trayendola desde la API.
        //FIX: funcion async dentro del onclick, tarda en traer la charla
        filtrarCharlaPorNombre(hashtagClicked, charlasFetch).then(
          (charlaMatcheada) => {
            let charla = charlaMatcheada;
            pushPage(navigator, charla);
          }
        );
        console.info("el que disparo el click fue: ", hashtagClicked);
      };
    });
  }

  componentDidMount() {
    //A: montado el componente llama a la función que crea los links
    //DBG: console.info("tarjetaTexto.js/montaje");
    //A: Paso
    const datosProps = this.props.tarjetaTextoProps;
    this.agregarOnClickHashtags(this.props.tarjetaTextoProps);
    //TEST
    //traerCharlasDelTexto(datosProps.charlasFetch).then((charlas) => console.info(charlas));
    //Resultado: un array SOLO con las charlas (objetos) de la tarjetaTexto correspondiente ej: [{titulo: #titulo1, pk: 1}, {titulo: #titulo2, pk: 2}, {titulo: #titulo3, pk: 3}]
  }

  componentDidUpdate(prevProps, prevState) {
    //A: Si cambia por algún motivo el props que se le pasa a tarjeta, se actualiza el contenido
    if (this.props.textoCharla !== prevProps.textoCharla) {
      //DBG: console.log("tarjetaTexto.js/actualizacion: se actualizo pq cambiaron los props");
      this.setState({
        texto: this.props.textoCharla,
      });
    }
    if (this.state !== prevState) {
      //DBG: console.log("tarjetaTexto.js/actualización: se actualizo pq cambio el state");
    }
  }

  render() {
    //A: usa el atributo dangerouslySetInnerHTML para insertar HTML
    return html`
      <${Ons.Card}>
        <${Ons.ListItem} className="post-button-bar" modifier="nodivider">
          <div>
            <h4><b>Autor: ${this.state.texto.de_quien.username}</b></h4>
          </div>
          <div className="list-item__title">
            <p dangerouslySetInnerHTML=${this.createMarkup()}></p>
          </div>
          <div>
            <p>Creado: ${this.state.texto.fh_creado}</p>
          </div>
        <//>
      <//>
    `;
  }
}

export default TarjetaTexto;
