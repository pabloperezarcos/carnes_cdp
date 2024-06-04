document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('productForm');
    const productModalLabel = document.getElementById('productModalLabel');
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    let editMode = false;
    let editProductId = null;

    const renderProducts = (products) => {
        const productsTable = document.getElementById('products-table');
        productsTable.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.nombre}</td>
                <td>${product.descripcionCorta}</td>
                <td>${product.descripcion}</td>
                <td>${product.precio}</td>
                <td>${product.sku}</td>
                <td>${product.estado || 'N/A'}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct(${product.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Eliminar</button>
                </td>
            `;
            productsTable.appendChild(row);
        });
    };

    const loadProductsFromJSON = () => {
        if (!localStorage.getItem('productos')) {
            fetch('../data/productos.json')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('productos', JSON.stringify(data.productos));
                    renderProducts(data.productos);
                });
        } else {
            const products = JSON.parse(localStorage.getItem('productos'));
            renderProducts(products);
        }
    };

    const addProduct = (product) => {
        const products = JSON.parse(localStorage.getItem('productos')) || [];
        products.push(product);
        localStorage.setItem('productos', JSON.stringify(products));
        renderProducts(products);
    };

    const updateProduct = (updatedProduct) => {
        const products = JSON.parse(localStorage.getItem('productos')) || [];
        const index = products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
            products[index] = updatedProduct;
            localStorage.setItem('productos', JSON.stringify(products));
            renderProducts(products);
        }
    };

    const deleteProduct = (id) => {
        const products = JSON.parse(localStorage.getItem('productos')) || [];
        const updatedProducts = products.filter(product => product.id !== id);
        localStorage.setItem('productos', JSON.stringify(updatedProducts));
        renderProducts(updatedProducts);
    };

    window.editProduct = (id) => {
        const products = JSON.parse(localStorage.getItem('productos')) || [];
        const product = products.find(product => product.id === id);
        if (product) {
            editMode = true;
            editProductId = id;
            productModalLabel.textContent = 'Editar Producto';
            document.getElementById('product-name').value = product.nombre;
            document.getElementById('product-description-corta').value = product.descripcionCorta;
            document.getElementById('product-description').value = product.descripcion;
            document.getElementById('product-price').value = product.precio;
            document.getElementById('product-sku').value = product.sku;
            document.getElementById('product-status').value = product.estado || 'N/A';
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
        const descripcionCorta = document.getElementById('product-description-corta').value;
        const descripcion = document.getElementById('product-description').value;
        const price = document.getElementById('product-price').value;
        const sku = document.getElementById('product-sku').value;
        const status = document.getElementById('product-status').value;

        if (editMode) {
            const updatedProduct = { id: editProductId, nombre: name, descripcionCorta: descripcionCorta, descripcion: descripcion, precio: price, sku: sku, estado: status };
            updateProduct(updatedProduct);
            editMode = false;
            editProductId = null;
        } else {
            const newProduct = { id: Date.now(), nombre: name, descripcionCorta: descripcionCorta, descripcion: descripcion, precio: price, sku: sku, estado: status };
            addProduct(newProduct);
        }

        productModal.hide();
        setTimeout(() => {
            alert('Producto guardado con éxito.');
        }, 500); // Timeout to ensure the modal closes properly
    });

    loadProductsFromJSON();
});
