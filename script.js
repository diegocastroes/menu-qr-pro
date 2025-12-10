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
