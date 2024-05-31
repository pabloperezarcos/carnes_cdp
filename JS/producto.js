document.addEventListener('DOMContentLoaded', function () {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const productName = document.querySelector('h1.display-4').textContent;
    const productPrice = parseFloat(document.getElementById('product-price').textContent.replace('$', '').replace('.', ''));
    const quantityInput = document.getElementById('quantity');

    addToCartBtn.addEventListener('click', function () {
        const quantity = parseInt(quantityInput.value);
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if the item is already in the cart
        const existingItemIndex = cartItems.findIndex(item => item.name === productName);
        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            cartItems.push({ name: productName, price: productPrice, quantity: quantity });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Producto agregado al carrito');
    });
});
