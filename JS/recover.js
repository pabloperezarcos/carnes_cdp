document.addEventListener('DOMContentLoaded', function () {
    const recoverForm = document.getElementById('recoverForm');

    recoverForm.addEventListener('submit', function (event) {
        event.preventDefault();
        handleRecoverPassword();
    });
});

function handleRecoverPassword() {
    const email = document.getElementById('email').value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const user = usuarios.find(user => user.email === email);

    if (user) {
        alert('Se ha enviado un correo de recuperación a ' + email);
        // Aquí se puede simular el envío de un correo o cualquier otra acción necesaria.
    } else {
        alert('El correo electrónico no está registrado.');
    }

    return false;
}
