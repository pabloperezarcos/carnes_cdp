document.addEventListener('DOMContentLoaded', function () {
    // Extrae parámetros de la URL para identificar qué producto mostrar.
    const urlParams = new URLSearchParams(window.location.search);
    const productSlug = urlParams.get('product');

    // Realiza una solicitud para obtener datos de los productos desde un archivo JSON.
    fetch('../data/productos.json')
        .then(response => response.json()) // Convierte la respuesta en JSON.
        .then(data => {
            // Busca en la lista de productos el que coincide con el slug obtenido de la URL.
            const producto = data.productos.find(p => p.slug === productSlug);
            if (producto) {
                // Actualiza el DOM con la información del producto encontrado.
                document.getElementById('product-name').textContent = producto.nombre;
                document.getElementById('product-description').textContent = producto.descripcionCorta;
                document.getElementById('product-breadcrumb').textContent = producto.nombre;
                document.getElementById('product-image').src = `../${producto.imagen}`;
                document.getElementById('product-name-detail').textContent = producto.nombre;
                document.getElementById('product-sku').textContent = `SKU: ${producto.sku}`;
                document.getElementById('product-price').textContent = producto.precio;
                document.getElementById('product-description-detail').textContent = producto.descripcion;

                // Gestiona la visualización de productos relacionados en un carrusel.
                const relatedProductsContainer = document.getElementById('related-products-carousel-inner');
                let row = document.createElement('div');
                row.classList.add('carousel-item');
                let count = 0;

                // Itera sobre todos los productos para encontrar y mostrar productos relacionados.
                data.productos.forEach(relatedProduct => {
                    if (relatedProduct.slug !== productSlug) {
                        // Crea nuevas filas cada 3 productos.
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

                        // Crea la tarjeta para cada producto relacionado.
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

                // Asegura que la última fila se agregue al contenedor si contiene elementos.
                if (row.querySelector('.row').childElementCount > 0) {
                    relatedProductsContainer.appendChild(row);
                }
            } else {
                // Si el producto no existe, redirige al usuario a una página de error.
                window.location.href = '/404.html';
            }
        });

    document.getElementById('add-to-cart-btn').addEventListener('click', function () {
        // Obtiene la cantidad del producto deseada por el usuario desde el campo de entrada 'quantity'.
        const quantity = document.getElementById('quantity').value;
        // Recupera la lista de elementos del carrito almacenada en localStorage o inicializa un arreglo vacío si no existe.
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        // Crea un objeto 'item' que representa el producto que se va a agregar al carrito.
        const item = {
            slug: productSlug, // Identificador único del producto.
            name: document.getElementById('product-name').textContent, // Nombre del producto.
            price: parseFloat(document.getElementById('product-price').textContent.replace(/[^\d.-]/g, '')), // Precio del producto, limpiando el texto para convertirlo a número.
            quantity: parseInt(quantity) // Cantidad del producto, convertida a entero.
        };
        // Agrega el objeto 'item' al arreglo de 'cartItems'.
        cartItems.push(item);
        // Guarda el arreglo actualizado de 'cartItems' en localStorage en formato JSON.
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // Muestra una alerta al usuario confirmando que el producto ha sido agregado al carrito.
        alert('Producto agregado al carrito.');
    });

});
