async function filtrarCharlaPorNombre(nombreCharla, charlasFetch) {
  //DBG: console.log("nombreCharla que recibi:" + nombreCharla);
  //A: Traigo todas las charlas de la API con charlasFetch
  const charlaMatcheada = charlasFetch()
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

async function charlas_fetch() {
  //U: fetch usando rest-api-token para traer las charlas
  const res = await fetchConToken("https://si.podemosaprender.org/api/charla/");
  return res;
}

async function charlas_sin_casuales() {
  //U: trae charlas, excluye las que empiezan con #casual (muchas)
  const res = await charlas_fetch();
  const charlas = await res.json();
  const charlasFiltradas = charlas.filter(
    (charla) => !charla.titulo.startsWith("#casual")
  );
  //DBG: console.info("home.js/obtenerYfiltrarCharlas ejecutado");
  return charlasFiltradas;
}

async function fetch_textosCharla(idCharla) {
  //U: trae todos los textos de una charla
  console.log("fetch_textosCharla", idCharla);
  const res = await fetchConToken(
    //A: funcion definida en auth-servicio para acceder a la API con un token
    `https://si.podemosaprender.org/api/charla/${idCharla}`
  );
  return res;
}

function linkParaHashtag(hashtag) {
  return `<a href="#" class="hashtagLink">${hashtag}</a>`;
  //A: agrego la class "hashtagLink" para referenciarla en agregarOnClickHashtags()
}

function hashtagsALinks(textosCharla) {
  //A: Recorro cada texto de la charla renderizada
  //Y reemplazo cada '#tag' por el mismo '#tag' entre etiquetas <a></a> para poder clickearlos
  textosCharla.forEach((textoItem) => {
    textoItem.texto = textoItem.texto.replace(
      /#([A-Za-z0-9_]+)/g,
      linkParaHashtag
    );
  });
  //DBG:console.info(textosCharla);
  return textosCharla;
}

async function obtenerTextosDeCharla(charla) {
  const res = await fetch_textosCharla(charla);
  const data = await res.json();
  //A: Paso como parámetro la lista de textos de la charla correspondiente a funcion hashtagsALinks()
  const textosConHashtagsLinks = hashtagsALinks(data.textos);
  //DBG: console.info("charla.js/obtenerTextosDeCharla ejecutado");
  return textosConHashtagsLinks;
}

export {
  filtrarCharlaPorNombre,
  traerTodosLosHashtags,
  obtenerObjetosCharlas,
  traerCharlasDelTexto,
  charlas_fetch,
  charlas_sin_casuales,
  fetch_textosCharla,
  linkParaHashtag,
  hashtagsALinks,
  obtenerTextosDeCharla,
};
