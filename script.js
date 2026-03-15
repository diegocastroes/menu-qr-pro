// CAMBIO JS 1: Botón para modo claro / oscuro
const botonModo = document.getElementById('toggle-modo'); /* Esto lo que hace es que me crea una constante(o sea una variable que nunca puede ni va a cambiar llamada botonModo , luego con document.getElementById() busco en el documento HTML que me obtenga un elemento, en este caso un Id llamado  'toggle-modo'(modo alternar en ingles) */
const logo = document.querySelector('.logo-central');
let angulo = 0;  

/* Idea: al momento de darle cabiar de color el logo central haga movimiento de 360 deg */
botonModo.addEventListener('click', () => { /* Esta linea se desglosa de la siguiente manera: " botonModo.addEventListener()" = esto lo que hace esque a nustra constante "botonModo" y se le agrega un escuchador de eventos (clicl,mover mause etc) en nuestro caso es un clic, " 'click', "() => { " esto lo que hace esque el escuchador va estar pendiente de que le den clic a el boton y luego se va a ejecutar una funcion de flecha, que es vacia ya que no necesita parametros */

  document.body.classList.toggle('modo-oscuro'); /* Esta linea de desglosa de la siguuiente manera:  document.body = se refiere a toda la pagina de el documento por el body, .classList = Esto es lo que contiene todas las clases que tiene la etiqueta, en nuestro caso ninguna, esto nos crea una lista vacia, lista para el .toggle('modo-oscuro') = esto lo que hace es que nos agrega a el body la clase= modo-oscuro y aplica todos los styles css que tenga , si al hacer clic ya se tiene la clase 'modo-oscuro', se quita y queda como antes */

  if (document.body.classList.contains('modo-oscuro')) { /* Esto es un condicional que le aplica un metodo de classList a el body de la pagina , llamado contains que lo que hace es que nos devuelve un boleano "true" si la clase 'modo-oscuro" esta aplicada en el body y si no esta pues nos devuelve "false" */
    botonModo.textContent = 'Modo claro'; /* esto lo que hace esque con "textContent" se le cambia el texto que se ve dentro de el boton en este caso a 'Modo claro', o sea si el el condicional nos da true entonces el boton dira Modo-claro o sea que al espichar se pondra claro y si por en contrario el condicional da false pues el boton nos mostrara 'Modo oscuro' */
    angulo += 360;
  } else {
    botonModo.textContent = 'Modo oscuro';
      angulo -= 360;
  }

  logo.style.transform = `rotate(${angulo}deg)`;
  console.log('Nuevo ángulo:', angulo);  

});

// Resalta el título de sección al tocarla
const titulos = document.querySelectorAll('h2'); /* Esto lo que hace esque nos crea una constante o sea una variable que no se puede modificar, llamada titulos, que nos va a guardar cada h2 con la linea "document.querySelectorAll('h2')" que significa del documento consultame todos los selectores que sean 'h2' y los acomoda en una lista "NodeList": es una coleccion de nodos de el "DOM": Document Object Model(Modelo de Objetos del Documento) Esto es una representacion en memoria que el navegador crea de nuestro HTML convirtiendolo en un arbol de objetos, Esto es el puente entre el HTML y el JavaScript, sin el el JavaScript no podria ver ni tocar el html, el NodeList nos crea una lista de todos nuestro nodos, en nuestro caso los H2 y los acomoda de la siguiente forma: [h2#1, h2#2, h2#3] */

titulos.forEach((titulo) => { /* Esta linea se desglosa de la siguiente manera, "titulos.": Esto hace referencia a la constante que creamos previamente la cual contiene todos nuestros H2, luego sigue el "forEach()": Esto es un bucle el cual nos va a iterar cada "(titulo)": de la Nodelist en la cual estan todos los titulos, este va a tomar cada titulo y nos lo va a guardar en una variable temporal llamada titulo a la cual se le va a aplicar la funcion callback: Esto es la instruccion que se ejecuta la cual es esta toda esta: forEach((titulo) => {, "=> {": esto es una funcion de flecha que ejecuta lo que sigue aca abajo*/
  titulo.addEventListener('click', () => { /* Aca lo que hay es la el contenido de nuestra primera funcion callback la cual lo que hace esque nos toma nuestra variable temporal "titulo" la cual contiene un H2(o cualquier elemento de la NodeList) y le va a  agregar un "addEventListener()", que es una Escuchador de eventos en este caso va a escuchar un "'click', () => {*"(cuando se le de clic a el h2) y se ejecuta nuestro segungo callback o instruccion, que es vacia ya que no necesita parametros la cual nos va a ejecutar el codigo de abajo*/
    titulo.scrollIntoView({ behavior: 'smooth', block: 'start' }); /* Esto lo que hace es que a nuestro "titulo" se le va a aplicar un metodo de el DOM(Modelo de Objetos del Documento) el cual es "scrollIntoView" que lo que hace esque nos va a Desplazare hacia la vista en nuestro caso hacia el H2, luego se le agregan Objetos de configuracion que pueden ser opcionale lo cuales en nuestro caso son "{ behavior: 'smooth', block: 'start' }" que lo que hacen es lo siguiente: "behavior: 'smooth'" (comportamiento: suave), oses que al moemnto de tocar el elemento se nos va a dirigir a el de manera suave y no abrutamente si no lo pusieramos, luego viene el  "block: 'start'"(bloque : inicio), lo cual lo que hace es que nos va a llevar el elemento a la parte mas arriba de nuestra pagina */
  });
});

/*Despliegue de ingredinetes*/

function toggleIng(producto) { /* Esto es una funcion llamada = toggleIng que nos recibe una variable a la que  llamamos "producto" la cual nos va a almacenar todo el contenido que tenga el li al que se le de clic, con el codigo   que se encuentra en el HTML como: <li onclick="toggleIng(this)"> /* El toggleIng significa: Alternar Ingredientes */
    const ing = producto.querySelector('.ingredientes'); /* Esta linea lo que hace es que nos crea una constante llamada = ing la cual  nos va a guardar de el elemento HTML el cual lo llamamos: "producto" el cual es un li de ese li solo vamos a utilizar la clase '.ingredientes' con el metodo DOM( Document Object Model):querySelector('.ingredientes') */
    if (ing.classList.contains('visible')) { /* Esta linea lo que hace esque nos crea un condicional if-else, esta linea se desglosa de la siguiente manera, ing.classList = lo que hace es que nos va a obtener la lista de clases css de el div ingredientes , luego usa una un metodo llamado .contains que nos pregunta si tenemos la clase 'visible', si es true entonces se nos va a ejecutar el codigo de abajo */
        /*ing.style.height = '0px'; /* Esto lo que hace esque con ".style" nos va a aplicar el estilo "heigth" el cual va a imponerse sobre cualquier "heigth" de el archivo css, con  ".height" = '0px', lo que hacemos esque se colapsa la altura a 0 pixeles */
        setTimeout(() => ing.classList.remove('visible'), 10); /* Esta linea se desglosa de la siguiente manera, setTimeout() = Esto nos estable un tiempo de x milisegundos antes de ejecutar luego establecesmos una funcion de flecha o un "callback" que lo que hace esque nos va a buscar la clase "visible" y nos la va a quitar con un delay/retraso de 10 mls, osea que visualmente se nos va a plegar o quitar los ingredientes */
    } else { /* Esto es si por el contrario nos da false en nuestro condicional se ejecutara el codigo de abajo */
        ing.classList.add('visible'); /* Esto lo que hace es que nos usa un metodo de la clase classList, el cual es "add()" el cual lo que hace esque nos va a agregar a nuestra variable constante "ing" (la cual contiene la clase HTML "ingredientes"), la clase visible para poder desplegar los ingredientes  */
        /*ing.style.height = ing.scrollHeight + 'px'; /* Esto lo que hace es que se van a agregar un estilo  de la altura el cual va a hacer que nuestra variable ing se despliegue al tamaño real de el contenido (Tamaño de letras y el padding) en nuestro caso de los ingredientes */
    }

    /* Codigo para rotacion de el logo de precios  */
    const log = producto.querySelector('.logo-precios');

    if (log.classList.contains('visible')) {
      setTimeout(() => log.classList.remove('visible'), 10);
    }
    else {
      log.classList.add('visible');
    }

}
