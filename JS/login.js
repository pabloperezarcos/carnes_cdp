document.addEventListener('DOMContentLoaded', function () {
    // Obtiene el formulario de inicio de sesión por su ID
    const loginForm = document.getElementById('loginForm');

    // Añade un escuchador de eventos para el evento 'submit' del formulario
    loginForm.addEventListener('submit', function (event) {
        // Previene el envío del formulario por defecto
        event.preventDefault();
        // Obtiene los valores de los campos de correo electrónico y contraseña
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Cargar usuarios desde el archivo JSON
        fetch('/data/usuarios.json')
            // Convierte la respuesta en JSON
            .then(response => response.json())
            .then(data => {
                // Obtiene la lista de usuarios del archivo JSON
                const usuarios = data.usuarios;

                // Busca un usuario que coincida con el correo electrónico y la contraseña ingresados
                const user = usuarios.find(user => user.email === email && user.password === password);

                // Si se encuentra un usuario que coincide
                if (user) {
                    // Almacena el estado de inicio de sesión y el rol del usuario en sessionStorage
                    sessionStorage.setItem('userLoggedIn', 'true');
                    sessionStorage.setItem('userRole', user.rol);
                    // Redirige al usuario a la página de administración
                    window.location.href = '/pages/admin.html';
                } else {
                    // Muestra una alerta si las credenciales son incorrectas
                    alert('Credenciales incorrectas');
                }
            })
            .catch(error => {
                // Maneja cualquier error que ocurra durante la carga de usuarios
                console.error('Error al cargar los usuarios:', error);
                alert('Error al cargar los datos de usuario.');
            });
    });
});
