document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Previene el envío del formulario por defecto

        if (validateRegisterForm()) {
            const fullName = document.getElementById('fullName').value.trim();
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const birthdate = document.getElementById('birthdate').value.trim();
            const address = document.getElementById('address').value.trim();

            const newUser = {
                id: Date.now(),
                nombre: fullName,
                username: username,
                email: email,
                password: password,
                rol: 'cliente',
                birthdate: birthdate,
                address: address
            };

            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            usuarios.push(newUser);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            alert('Registro exitoso. Ahora puede iniciar sesión.');

            setTimeout(function () {
                window.location.href = 'login.html';
            }, 2000); // Retrasa la redirección por 2 segundos
        }
    });
});
