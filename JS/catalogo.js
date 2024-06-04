document.addEventListener('DOMContentLoaded', function () {
    // Realiza una solicitud para obtener datos de los productos desde un archivo JSON.
    fetch('../data/productos.json')
        .then(response => response.json()) // Convierte la respuesta en JSON.
        .then(data => {
            // Obtiene el contenedor donde se mostrarán los productos.
            const productsContainer = document.getElementById('products-container');
            // Itera sobre cada producto en los datos obtenidos.
            data.productos.forEach(producto => {
                // Crea un nuevo elemento div para la tarjeta del producto.
                const productCard = document.createElement('div');
                // Añade clases de Bootstrap para la disposición de las tarjetas.
                productCard.classList.add('col-lg-4', 'col-md-6', 'mb-4');
                // Define el contenido HTML de la tarjeta del producto.
                productCard.innerHTML = `
                    <div class="card lift-on-hover">
                        ${producto.estado === 'oferta' ? '<div class="badge-overlay"><span class="badge badge-sale">OFERTA</span></div>' : ''}
                        ${producto.estado === 'agotado' ? '<div class="badge-overlay"><span class="badge badge-soldout">AGOTADO</span></div>' : ''}
                        <img src="..${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.descripcionCorta}</p>
                            <p class="price">${producto.precio} / 1 kilo</p>
                            <a href="producto.html?product=${producto.slug}" class="btn btn-primary">Ver Producto</a>
                        </div>
                    </div>
                `;
                // Añade la tarjeta del producto al contenedor de productos.
                productsContainer.appendChild(productCard);
            });
        });
});
