document.getElementById('registerForm').addEventListener('submit', function (event) {
    // Previene el envío del formulario por defecto
    event.preventDefault();

    // Obtiene los valores de los campos del formulario
    const fullName = document.getElementById('fullName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const birthdate = document.getElementById('birthdate').value;
    const address = document.getElementById('address').value;

    // Validaciones
    // Verifica si las contraseñas coinciden
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Crear nuevo usuario
    const newUser = {
        id: Date.now(), // Genera un ID único basado en la fecha y hora actual
        nombre: fullName,
        email: email,
        password: password,
        rol: 'cliente', // Asigna el rol por defecto como 'cliente'
        username: username,
        birthdate: birthdate,
        address: address
    };

    // Obtener usuarios existentes del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Agregar nuevo usuario a la lista de usuarios
    usuarios.push(newUser);

    // Guardar la lista actualizada de usuarios en el localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Muestra una alerta de éxito y redirige al usuario a la página de inicio de sesión
    alert('Registro exitoso. Ahora puede iniciar sesión.');
    window.location.href = 'login.html';
});
