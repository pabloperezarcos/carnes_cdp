document.addEventListener('DOMContentLoaded', function () {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartTotal = document.getElementById('cart-total');
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');

    function formatCurrency(value) {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
    }

    function updateCartTotal() {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotal.textContent = formatCurrency(total);
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('list-group-item');
            cartItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${item.name}</h5>
                        <p>${formatCurrency(item.price)} x 
                        <input type="number" value="${item.quantity}" min="1" class="form-control quantity-input" data-index="${index}">
                        </p>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-danger" onclick="removeCartItem(${index})">Eliminar</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    function removeCartItem(index) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
        updateCartTotal();
    }

    window.removeCartItem = removeCartItem;

    cartItemsContainer.addEventListener('change', function (e) {
        if (e.target.classList.contains('quantity-input')) {
            const index = e.target.getAttribute('data-index');
            const newQuantity = parseInt(e.target.value);
            cartItems[index].quantity = newQuantity;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems();
            updateCartTotal();
        }
    });

    checkoutBtn.addEventListener('click', function () {
        alert('Procediendo al pago...');
    });

    renderCartItems();
    updateCartTotal();
});
