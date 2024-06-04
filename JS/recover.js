document.addEventListener('DOMContentLoaded', function () {
    // Obtiene el formulario de recuperación de contraseña por su ID
    const recoverForm = document.getElementById('recoverForm');

    // Añade un escuchador de eventos para el evento 'submit' del formulario
    recoverForm.addEventListener('submit', function (event) {
        // Previene el envío del formulario por defecto
        event.preventDefault();
        // Llama a la función para manejar la recuperación de contraseña
        handleRecoverPassword();
    });
});

function handleRecoverPassword() {
    // Obtiene el valor del campo de correo electrónico
    const email = document.getElementById('email').value;
    // Obtiene la lista de usuarios almacenada en localStorage o inicializa un arreglo vacío si no hay usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Busca un usuario que coincida con el correo electrónico ingresado
    const user = usuarios.find(user => user.email === email);

    if (user) {
        // Si se encuentra un usuario con el correo electrónico ingresado, muestra una alerta
        alert('Se ha enviado un correo de recuperación a ' + email);
    } else {
        // Si no se encuentra un usuario con el correo electrónico ingresado, muestra una alerta
        alert('El correo electrónico no está registrado.');
    }

    // Retorna false para asegurar que no se procese el envío del formulario
    return false;
}
