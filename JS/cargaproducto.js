document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productSlug = urlParams.get('product');

    fetch('../data/productos.json')
        .then(response => response.json())
        .then(data => {
            const producto = data.productos.find(p => p.slug === productSlug);
            if (producto) {
                document.getElementById('product-name').textContent = producto.nombre;
                document.getElementById('product-description').textContent = producto.descripcionCorta;
                document.getElementById('product-breadcrumb').textContent = producto.nombre;
                document.getElementById('product-image').src = `../${producto.imagen}`;
                document.getElementById('product-name-detail').textContent = producto.nombre;
                document.getElementById('product-sku').textContent = `SKU: ${producto.sku}`;
                document.getElementById('product-price').textContent = producto.precio;
                document.getElementById('product-description-detail').textContent = producto.descripcion;

                const relatedProductsContainer = document.getElementById('related-products-carousel-inner');
                let row = document.createElement('div');
                row.classList.add('carousel-item');
                let count = 0;

                data.productos.forEach(relatedProduct => {
                    if (relatedProduct.slug !== productSlug) {
                        if (count % 3 === 0) {
                            if (count !== 0) {
                                relatedProductsContainer.appendChild(row);
                            }
                            row = document.createElement('div');
                            row.classList.add('carousel-item');
                            if (count === 0) {
                                row.classList.add('active');
                            }
                            const rowInner = document.createElement('div');
                            rowInner.classList.add('row');
                            row.appendChild(rowInner);
                        }

                        const col = document.createElement('div');
                        col.classList.add('col-md-4');
                        col.innerHTML = `
                            <div class="card">
                                <img src="..${relatedProduct.imagen}" class="card-img-top" alt="${relatedProduct.nombre}">
                                <div class="card-body">
                                    <h5 class="card-title">${relatedProduct.nombre}</h5>
                                    <p class="card-text">${relatedProduct.descripcionCorta}</p>
                                    <a href="producto.html?product=${relatedProduct.slug}" class="btn btn-primary">Ver Producto</a>
                                </div>
                            </div>
                        `;
                        row.querySelector('.row').appendChild(col);
                        count++;
                    }
                });

                if (row.querySelector('.row').childElementCount > 0) {
                    relatedProductsContainer.appendChild(row);
                }
            } else {
                // Redirigir a una página de error si el producto no se encuentra
                window.location.href = '/404.html';
            }
        });

    document.getElementById('add-to-cart-btn').addEventListener('click', function () {
        const quantity = document.getElementById('quantity').value;
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const item = {
            slug: productSlug,
            name: document.getElementById('product-name').textContent,
            price: parseFloat(document.getElementById('product-price').textContent.replace(/[^\d.-]/g, '')),
            quantity: parseInt(quantity)
        };
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Producto agregado al carrito.');
    });
});
