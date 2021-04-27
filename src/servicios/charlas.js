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

function traerTodosLosHashtagsDelDOM() {
  //A: Traigo todos los elementos <a> que tengan la clase hashtagLink. Me devuelve una HTMLCollection de elementos <a>
  let listaHashtags = document.getElementsByClassName("hashtagLink");
  //A: Transformo la HTMLCollection a un array
  listaHashtags = [...listaHashtags];
  return listaHashtags;
}

async function traerCharlasDelTexto() {
  const listaHashtags = traerTodosLosHashtagsDelDOM().map(
    (anchorElement) => anchorElement.innerHTML
  );
  const charlasTraidasApi = await charlas();
  const titulosCharla = charlasTraidasApi.map((ch) => ch.titulo);
  const charlasQueExisten = listaHashtags.filter(
    (nombre) => titulosCharla.indexOf(nombre) > -1
  );
  //A: Solo charlas que existen
  return charlasQueExisten;
}

async function charlas_fetch() {
  //U: fetch usando rest-api-token para traer las charlas
  const res = await fetchConToken("https://si.podemosaprender.org/api/charla/");
  return res;
}

var Charlas_ = null; //U: Cacheamos las charlas, titulo => charla

async function charlas() {
  //U: trae charlas, excluye las que empiezan con #casual (muchas)
  if (Charlas_ != null) return Object.values(Charlas_);

  const res = await charlas_fetch();
  const charlas = await res.json();
  Charlas_ = {};
  charlas.forEach((ch) => {
    Charlas_[ch.titulo] = ch;
  });
  return charlas;
}

async function charlas_sin_casuales() {
  //U: trae charlas, excluye las que empiezan con #casual (muchas)
  const lasCharlas = await charlas();
  const charlasFiltradas = lasCharlas.filter(
    (charla) => !charla.titulo.startsWith("#casual")
  );
  //DBG: console.info("home.js/obtenerYfiltrarCharlas ejecutado");
  return charlasFiltradas;
}

async function charlaConTitulo(titulo) {
  const lasCharlas = await charlas();
  return Charlas_[titulo];
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

function markdownAhtml(txt) {
  //U: Markdown a HTML para usar con dangerouslySetInnerHTML
  return { __html: marked(txt) };
}

export {
  filtrarCharlaPorNombre,
  traerCharlasDelTexto,
  charlas_fetch,
  charlas_sin_casuales,
  fetch_textosCharla,
  linkParaHashtag,
  hashtagsALinks,
  obtenerTextosDeCharla,
  markdownAhtml,
  charlaConTitulo,
};
