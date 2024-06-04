document.addEventListener('DOMContentLoaded', function () {
    // Obtiene el formulario de producto, la etiqueta del modal y crea una instancia del modal de Bootstrap
    const productForm = document.getElementById('productForm');
    const productModalLabel = document.getElementById('productModalLabel');
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    let editMode = false;
    let editProductId = null;

    // Función para renderizar productos en la tabla
    const renderProducts = (products) => {
        const productsTable = document.getElementById('products-table');
        productsTable.innerHTML = ''; // Limpia el contenido previo de la tabla
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
                    <button class="btn btn-danger btn-sm" onclick="confirmDeleteProduct(${product.id})">Eliminar</button>
                </td>
            `;
            productsTable.appendChild(row);
        });
    };

    // Función para cargar productos desde un archivo JSON o localStorage
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

    // Función para guardar productos en localStorage y renderizarlos
    const saveAndRenderProducts = (products) => {
        localStorage.setItem('productos', JSON.stringify(products));
        renderProducts(products);
    };

    // Función para agregar un nuevo producto
    const addProduct = (product) => {
        const products = JSON.parse(localStorage.getItem('productos')) || [];
        products.push(product);
        saveAndRenderProducts(products);
    };

    // Función para actualizar un producto existente
    const updateProduct = (updatedProduct) => {
        const products = JSON.parse(localStorage.getItem('productos')) || [];
        const index = products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
            products[index] = updatedProduct;
            saveAndRenderProducts(products);
        }
    };

    // Función para eliminar un producto
    const deleteProduct = (id) => {
        const products = JSON.parse(localStorage.getItem('productos')) || [];
        const updatedProducts = products.filter(product => product.id !== id);
        saveAndRenderProducts(updatedProducts);
    };

    // Función para confirmar la eliminación de un producto
    window.confirmDeleteProduct = (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            deleteProduct(id);
        }
    };

    // Función para editar un producto
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

    // Maneja el envío del formulario de producto
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('product-name').value;
        const descripcionCorta = document.getElementById('product-description-corta').value;
        const descripcion = document.getElementById('product-description').value;
        const price = document.getElementById('product-price').value;
        const sku = document.getElementById('product-sku').value;
        const status = document.getElementById('product-status').value;

        const product = {
            id: editMode ? editProductId : Date.now(),
            nombre: name,
            descripcionCorta: descripcionCorta,
            descripcion: descripcion,
            precio: price,
            sku: sku,
            estado: status
        };

        if (editMode) {
            updateProduct(product);
            editMode = false;
            editProductId = null;
        } else {
            addProduct(product);
        }

        productModal.hide();
        setTimeout(() => {
            alert('Producto guardado con éxito.');
        }, 500);
    });

    // Cargar los productos desde JSON al cargar la página
    loadProductsFromJSON();
});
