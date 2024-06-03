document.addEventListener('DOMContentLoaded', function () {
    const productsTable = document.getElementById('products-table');
    const productForm = document.getElementById('productForm');
    const productModalLabel = document.getElementById('productModalLabel');
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    let editMode = false;
    let editProductId = null;

    const loadProductsFromJSON = () => {
        if (!localStorage.getItem('productos')) {
            fetch('../data/productos.json')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('productos', JSON.stringify(data.productos));
                    fetchProducts();
                });
        } else {
            fetchProducts();
        }
    };

    const fetchProducts = () => {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        renderProducts(productos);
    };

    const renderProducts = (productos) => {
        productsTable.innerHTML = '';
        productos.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.nombre}</td>
                <td>${product.descripcion}</td>
                <td>${product.precio}</td>
                <td><img src="${product.imagen}" alt="${product.nombre}" style="height: 50px;"></td>
                <td>${product.categoria}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editProduct(${product.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">Eliminar</button>
                </td>
            `;
            productsTable.appendChild(row);
        });
    };

    const addProduct = (product) => {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos.push(product);
        localStorage.setItem('productos', JSON.stringify(productos));
        fetchProducts();
    };

    const updateProduct = (updatedProduct) => {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const index = productos.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
            productos[index] = updatedProduct;
            localStorage.setItem('productos', JSON.stringify(productos));
            fetchProducts();
        }
    };

    const deleteProduct = (id) => {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const updatedProducts = productos.filter(product => product.id !== id);
        localStorage.setItem('productos', JSON.stringify(updatedProducts));
        fetchProducts();
    };

    window.editProduct = (id) => {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const product = productos.find(product => product.id === id);
        if (product) {
            editMode = true;
            editProductId = id;
            productModalLabel.textContent = 'Editar Producto';
            document.getElementById('product-name').value = product.nombre;
            document.getElementById('product-description').value = product.descripcion;
            document.getElementById('product-price').value = product.precio;
            document.getElementById('product-image').value = product.imagen;
            document.getElementById('product-category').value = product.categoria;
            productModal.show();
        }
    };

    window.deleteProduct = (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            deleteProduct(id);
        }
    };

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('product-name').value;
        const description = document.getElementById('product-description').value;
        const price = parseFloat(document.getElementById('product-price').value);
        const image = document.getElementById('product-image').value;
        const category = document.getElementById('product-category').value;

        if (editMode) {
            const updatedProduct = { id: editProductId, nombre: name, descripcion: description, precio: price, imagen: image, categoria: category };
            updateProduct(updatedProduct);
        } else {
            const newProduct = { id: Date.now(), nombre: name, descripcion: description, precio: price, imagen: image, categoria: category };
            addProduct(newProduct);
        }

        productModal.hide();
        fetchProducts();
    });

    loadProductsFromJSON();
});
