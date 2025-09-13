// app.js — genera N cartas y hace logs para diagnóstico
document.addEventListener('DOMContentLoaded', () => { // Asegura DOM listo
  console.log('[app] DOM listo'); // Diagnóstico [ver consola]
  const contenedor = document.getElementById('container');

  if (!contenedor) {
    console.error('[app] No se encontró #container. Revisa el id en el HTML.');
    return;
  }

  // Datos de ejemplo (reemplazar por fetch a la API)
  const datos = [
    { titulo: 'Carta 1', texto: 'Descripción 1', imagen: 'https://picsum.photos/600/360?random=101', enlace: '#' },
    { titulo: 'Carta 2', texto: 'Descripción 2', imagen: 'https://picsum.photos/600/360?random=102', enlace: '#' },
    { titulo: 'Carta 3', texto: 'Descripción 3', imagen: 'https://picsum.photos/600/360?random=103', enlace: '#' },
    { titulo: 'Carta 4', texto: 'Descripción 4', imagen: 'https://picsum.photos/600/360?random=104', enlace: '#' }
  ];

  try {
    contenedor.innerHTML = '';
    datos.forEach(item => {
      const columna = document.createElement('div');
      columna.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4', 'p-4');

      columna.innerHTML = `
        <div class="card h-100 carta">
          <img src="${item.imagen}" class="card-img-top img-carta" alt="${item.titulo}">
          <div class="card-body">
            <h5 class="card-title titulo-carta">${item.titulo}</h5>
            <p class="card-text texto-carta">${item.texto}</p>
            <a href="${item.enlace || '#'}" class="btn btn-primary btn-sm boton-carta">Ver más</a>
          </div>
        </div>
      `;

      contenedor.appendChild(columna);
    });

    console.log('[app] Cartas renderizadas:', datos.length);
  } catch (e) {
    console.error('[app] Error renderizando cartas:', e);
  }
});
