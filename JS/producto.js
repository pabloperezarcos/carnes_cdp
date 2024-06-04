document.addEventListener('DOMContentLoaded', function () {
    // Obtiene el botón de agregar al carrito, el nombre del producto, el precio del producto y el campo de cantidad
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const productName = document.querySelector('h1.display-4').textContent;
    const productPrice = parseFloat(document.getElementById('product-price').textContent.replace('$', '').replace('.', ''));
    const quantityInput = document.getElementById('quantity');

    // Añade un escuchador de eventos al botón de agregar al carrito
    addToCartBtn.addEventListener('click', function () {
        // Obtiene la cantidad ingresada por el usuario
        const quantity = parseInt(quantityInput.value);
        // Obtiene los elementos del carrito almacenados en localStorage o inicializa un arreglo vacío si no hay elementos
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Verifica si el producto ya está en el carrito
        const existingItemIndex = cartItems.findIndex(item => item.name === productName);
        if (existingItemIndex !== -1) {
            // Si el producto ya está en el carrito, incrementa la cantidad
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            // Si el producto no está en el carrito, lo agrega con la cantidad especificada
            cartItems.push({ name: productName, price: productPrice, quantity: quantity });
        }

        // Guarda los elementos del carrito actualizados en localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // Muestra una alerta indicando que el producto fue agregado al carrito
        alert('Producto agregado al carrito');
    });
});
