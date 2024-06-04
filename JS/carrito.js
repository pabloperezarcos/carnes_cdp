document.addEventListener('DOMContentLoaded', function () {
    // Obtiene los elementos del carrito almacenados en localStorage o inicializa un arreglo vacío si no hay elementos.
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Obtiene el elemento del DOM donde se mostrará el total del carrito.
    const cartTotal = document.getElementById('cart-total');
    // Obtiene el contenedor donde se mostrarán los ítems del carrito.
    const cartItemsContainer = document.getElementById('cart-items');
    // Obtiene el botón de checkout.
    const checkoutBtn = document.getElementById('checkout-btn');

    // Función para formatear los valores como moneda en CLP.
    function formatCurrency(value) {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
    }

    // Función para actualizar el total del carrito.
    function updateCartTotal() {
        // Calcula el total sumando el precio por la cantidad de cada ítem.
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        // Actualiza el contenido del elemento de total del carrito.
        cartTotal.textContent = formatCurrency(total);
    }

    // Función para renderizar los ítems del carrito en el contenedor correspondiente.
    function renderCartItems() {
        // Limpia el contenido previo del contenedor.
        cartItemsContainer.innerHTML = '';
        // Itera sobre cada ítem del carrito.
        cartItems.forEach((item, index) => {
            console.log('Imagen del producto:', item.image); // Para verificar la ruta de la imagen
            // Crea un nuevo elemento div para cada ítem del carrito.
            const cartItem = document.createElement('div');
            cartItem.classList.add('list-group-item');
            // Define el contenido HTML del ítem del carrito.
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
            // Añade el ítem al contenedor del carrito.
            cartItemsContainer.appendChild(cartItem);
        });
    }

    // Función para eliminar un ítem del carrito.
    function removeCartItem(index) {
        // Elimina el ítem del arreglo de ítems del carrito.
        cartItems.splice(index, 1);
        // Actualiza localStorage con los ítems del carrito modificados.
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // Vuelve a renderizar los ítems del carrito y actualiza el total.
        renderCartItems();
        updateCartTotal();
    }

    // Expone la función removeCartItem globalmente para que pueda ser llamada desde el HTML.
    window.removeCartItem = removeCartItem;

    // Función para actualizar la cantidad de un ítem en el carrito.
    window.updateQuantity = function (index, quantity) {
        // Actualiza la cantidad del ítem en el arreglo.
        cartItems[index].quantity = parseInt(quantity);
        // Guarda el arreglo actualizado en localStorage.
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // Vuelve a renderizar los ítems del carrito y actualiza el total.
        renderCartItems();
        updateCartTotal();
    };

    // Añade un escuchador de eventos al botón de checkout.
    checkoutBtn.addEventListener('click', function () {
        // Muestra una alerta indicando que se está procediendo al pago.
        alert('Procediendo al pago...');
    });

    // Llama a las funciones para renderizar los ítems del carrito y actualizar el total al cargar la página.
    renderCartItems();
    updateCartTotal();
});
