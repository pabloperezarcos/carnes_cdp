document.addEventListener('DOMContentLoaded', function () {
    const productsTable = document.getElementById('products-table');
    const productForm = document.getElementById('productForm');
    const productModalLabel = document.getElementById('productModalLabel');
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    let editMode = false;
    let editProductId = null;

    const fetchProducts = async () => {
        const response = await fetch('/data/productos.json');
        const data = await response.json();
        renderProducts(data.productos);
    };

    const renderProducts = (productos) => {
        productsTable.innerHTML = '';
        productos.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.nombre}</td>
                <td>${formatCurrency(product.precio)}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editProduct(${product.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">Eliminar</button>
                </td>
            `;
            productsTable.appendChild(row);
        });
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
    };

    const addProduct = (product) => {
        // Lógica para agregar el producto
    };

    const editProduct = (id) => {
        // Lógica para editar el producto
    };

    const deleteProduct = (id) => {
        // Lógica para eliminar el producto
    };

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;

        if (editMode) {
            // Lógica para actualizar el producto
        } else {
            const newProduct = { id: Date.now(), nombre: name, precio: parseFloat(price) };
            addProduct(newProduct);
        }

        productModal.hide();
        fetchProducts();
    });

    fetchProducts();
});

function editProduct(id) {
    // Lógica para obtener y mostrar los datos del producto en el formulario
}

function deleteProduct(id) {
    // Lógica para eliminar el producto
}
