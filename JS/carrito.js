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
            console.log('Imagen del producto:', item.image); // Para verificar la ruta de la imagen
            const cartItem = document.createElement('div');
            cartItem.classList.add('list-group-item');
            cartItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${item.name}</h5>
                        <p>${formatCurrency(item.price)} x ${item.quantity}</p>
                    </div>
                    <div>
                        <input type="number" class="form-control" value="${item.quantity}" min="1" style="width: 60px; display: inline-block; margin-right: 10px;" onchange="updateQuantity(${index}, this.value)">
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

    window.updateQuantity = function (index, quantity) {
        cartItems[index].quantity = parseInt(quantity);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
        updateCartTotal();
    };

    checkoutBtn.addEventListener('click', function () {
        alert('Procediendo al pago...');
    });

    renderCartItems();
    updateCartTotal();
});
