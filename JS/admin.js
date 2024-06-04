document.addEventListener('DOMContentLoaded', function () {
    // Obtiene el rol del usuario almacenado en la sessionStorage.
    const userRole = sessionStorage.getItem('userRole');

    // Verifica si el rol del usuario no es 'admin'.
    if (userRole !== 'admin') {
        // Si no es administrador, muestra una alerta informando que no tiene permiso.
        alert('No tienes permiso para acceder a esta página.');
        // Redirige al usuario a la página principal.
        window.location.href = '/index.html';
    }

    // Obtiene el botón de cerrar sesión por su ID.
    const logoutButton = document.getElementById('logout');
    // Verifica si el botón de cerrar sesión existe.
    if (logoutButton) {
        // Agrega un evento 'click' al botón de cerrar sesión.
        logoutButton.addEventListener('click', function () {
            // Limpia todos los datos almacenados en sessionStorage.
            sessionStorage.clear();
            // Redirige al usuario a la página principal tras cerrar sesión.
            window.location.href = '/index.html';
        });
    }
});
