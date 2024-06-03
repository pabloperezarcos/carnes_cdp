document.addEventListener('DOMContentLoaded', function () {
    const userRole = sessionStorage.getItem('userRole');

    if (userRole !== 'admin') {
        alert('No tienes permiso para acceder a esta página.');
        window.location.href = '/index.html';
    }

    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            sessionStorage.clear();
            window.location.href = '/index.html';
        });
    }
});
