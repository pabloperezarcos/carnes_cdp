document.addEventListener('DOMContentLoaded', function () {
    // Obtiene el rol del usuario y el estado de inicio de sesión desde sessionStorage.
    const userRole = sessionStorage.getItem('userRole');
    const userLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';

    // Oculta elementos con la clase 'admin-only' si el usuario no es administrador.
    if (userRole !== 'admin') {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
    }

    // Oculta elementos con la clase 'user-only' si el usuario no está logueado.
    if (!userLoggedIn) {
        document.querySelectorAll('.user-only').forEach(el => el.style.display = 'none');
    } else {
        // Oculta elementos con la clase 'auth-only' si el usuario está logueado.
        document.querySelectorAll('.auth-only').forEach(el => el.style.display = 'none');
    }

    // Añade un escuchador de eventos al botón de logout.
    document.getElementById('logout-btn').addEventListener('click', function () {
        // Elimina el estado de inicio de sesión y el rol del usuario de sessionStorage.
        sessionStorage.removeItem('userLoggedIn');
        sessionStorage.removeItem('userRole');
        // Redirige al usuario a la página principal.
        window.location.href = '/index.html';
    });

    // Cargar algunos productos desde un archivo JSON
    fetch('data/productos.json')
        .then(response => response.json()) // Convierte la respuesta en JSON.
        .then(data => {
            // Obtiene el contenedor donde se mostrarán los productos.
            const productList = document.getElementById('product-list');
            // Selecciona los primeros 3 productos del archivo JSON.
            const productos = data.productos.slice(0, 3);
            // Itera sobre cada producto seleccionado.
            productos.forEach(product => {
                // Crea un nuevo elemento div para la tarjeta del producto.
                const productCard = document.createElement('div');
                productCard.classList.add('col-lg-4', 'col-md-6', 'mb-4'); // Añade clases de Bootstrap para la disposición de las tarjetas.
                // Define el contenido HTML de la tarjeta del producto.
                productCard.innerHTML = `
                    <div class="card lift-on-hover">
                        <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${product.nombre}</h5>
                            <p class="card-text">${product.descripcion}</p>
                            <p class="price">${product.precio} / 1 kilo</p>
                            <a href="pages/producto.html?product=${product.slug}" class="btn btn-primary">Ver Producto</a>
                        </div>
                    </div>
                `;
                // Añade la tarjeta del producto al contenedor de productos.
                productList.appendChild(productCard);
            });
        });
});
