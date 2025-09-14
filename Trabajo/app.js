// app.js — genera N cartas desde API pública de Ticketmaster y hace logs para diagnóstico
document.addEventListener('DOMContentLoaded', async () => { // Asegura DOM listo
  console.log('[app] DOM listo'); // Diagnóstico [ver consola]
  const contenedor = document.getElementById('container');

  if (!contenedor) {
    console.error('[app] No se encontró #container. Revisa el id en el HTML.');
    return;
  }

  try {
    // API de Ticketmaster para eventos en México
    const apiKey = "oM2HH2Aji7TzyCH7kRm8aRBgiLoz3URG"; // tu Consumer Key
    const urlMexico = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&countryCode=MX&size=10`;

    const response = await fetch(urlMexico);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const data = await response.json();

    // Verificar si hay eventos
    if (!data._embedded || !data._embedded.events) {
      throw new Error('No se encontraron eventos en la API.');
    }

    // Transformar datos de la API a formato de cartas
    const datos = data._embedded.events.map(event => ({
      titulo: event.name,
      texto: (event.description || event.info || 'Descripción no disponible.').substring(0, 150) + ((event.description || event.info || '').length > 150 ? '...' : ''),
      imagen: event.images && event.images.length > 0 ? event.images[0].url : 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      enlace: event.url
    }));

    // Filtrar eventos duplicados por título
    const uniqueDatos = datos.filter((event, index, self) => self.findIndex(e => e.titulo === event.titulo) === index);

    // Excluir eventos de "Monster Jam"
    const filteredDatos = uniqueDatos.filter(event => !event.titulo.toLowerCase().includes('monster jam'));

    contenedor.innerHTML = '';
    filteredDatos.forEach(item => {
      const columna = document.createElement('div');
      columna.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4', 'p-4');

      columna.innerHTML = `
        <div class="card h-100 carta">
          <img src="${item.imagen}" class="card-img-top img-carta" alt="${item.titulo}">
          <div class="card-body">
            <h5 class="card-title titulo-carta">${item.titulo}</h5>
            <p class="card-text texto-carta">${item.texto}</p>
            <a href="${item.enlace}" class="btn btn-primary btn-sm boton-carta" target="_blank">Ver más</a>
          </div>
        </div>
      `;

      contenedor.appendChild(columna);
    });

    // Actualizar imágenes del carrusel con imágenes de eventos
    const carouselImgs = document.querySelectorAll('.img-carrusel');
    for (let i = 0; i < Math.min(carouselImgs.length, filteredDatos.length); i++) {
      carouselImgs[i].src = filteredDatos[i].imagen;
      carouselImgs[i].alt = filteredDatos[i].titulo;
    }

    console.log('[app] Cartas renderizadas desde API de Ticketmaster:', filteredDatos.length, '(filtradas de', datos.length, 'totales)');
  } catch (e) {
    console.error('[app] Error obteniendo o renderizando cartas:', e);
    // Fallback a datos de ejemplo si falla la API
    const datosFallback = [
      { titulo: 'Error al cargar', texto: 'No se pudo conectar a la API de Ticketmaster. Revisa la consola.', imagen: 'https://picsum.photos/600/360?random=999', enlace: '#' }
    ];
    contenedor.innerHTML = '';
    datosFallback.forEach(item => {
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
  }
});
