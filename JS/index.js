    document.addEventListener('DOMContentLoaded', function () {
    const userRole = sessionStorage.getItem('userRole');
    const userLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';

    if (userRole !== 'admin') {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
    }

    if (!userLoggedIn) {
        document.querySelectorAll('.user-only').forEach(el => el.style.display = 'none');
    } else {
        document.querySelectorAll('.auth-only').forEach(el => el.style.display = 'none');
    }

    document.getElementById('logout-btn').addEventListener('click', function () {
        sessionStorage.removeItem('userLoggedIn');
    sessionStorage.removeItem('userRole');
    window.location.href = '/index.html';
    });

    // Cargar algunos productos desde JSON
    fetch('data/productos.json')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
    const productos = data.productos.slice(0, 3); // Mostrar solo los primeros 3 productos
            productos.forEach(product => {
                const productCard = document.createElement('div');
    productCard.classList.add('col-lg-4', 'col-md-6', 'mb-4');
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
    productList.appendChild(productCard);
            });
        });
});