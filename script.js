// CAMBIO JS 1: Botón para modo claro / oscuro
const botonModo = document.getElementById('toggle-modo');

botonModo.addEventListener('click', () => {
  // Alterna la clase en <body>
  document.body.classList.toggle('modo-oscuro');

  // Cambia el texto del botón
  if (document.body.classList.contains('modo-oscuro')) {
    botonModo.textContent = 'Modo claro';
  } else {
    botonModo.textContent = 'Modo oscuro';
  }
});

// Resalta el título de sección al tocarla
const titulos = document.querySelectorAll('h2');

titulos.forEach((titulo) => {
  titulo.addEventListener('click', () => {
    titulo.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/*Despliegue de ingredinetes*/

function toggleIng(producto) {
    const ing = producto.querySelector('.ingredientes');
    if (ing.classList.contains('visible')) {
        ing.style.height = '0px';
        setTimeout(() => ing.classList.remove('visible'), 10);
    } else {
        ing.classList.add('visible');
        ing.style.height = ing.scrollHeight + 'px';  // ← Altura EXACTA contenido
    }
}

