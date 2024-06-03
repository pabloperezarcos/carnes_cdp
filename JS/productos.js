document.addEventListener('DOMContentLoaded', function () {
    fetch('../data/productos.json')
        .then(response => response.json())
        .then(data => {
            const productsContainer = document.getElementById('products-container');
            data.productos.forEach(producto => {
                const productCard = document.createElement('div');
                productCard.classList.add('col-lg-4', 'col-md-6', 'mb-4');
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
                productsContainer.appendChild(productCard);
            });
        });
});
