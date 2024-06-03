document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Cargar usuarios desde el archivo JSON
        fetch('/data/usuarios.json')
            .then(response => response.json())
            .then(data => {
                const usuarios = data.usuarios;

                const user = usuarios.find(user => user.email === email && user.password === password);

                if (user) {
                    sessionStorage.setItem('userLoggedIn', 'true');
                    sessionStorage.setItem('userRole', user.rol);
                    window.location.href = '/pages/admin.html';
                } else {
                    alert('Credenciales incorrectas');
                }
            })
            .catch(error => {
                console.error('Error al cargar los usuarios:', error);
                alert('Error al cargar los datos de usuario.');
            });
    });
});
