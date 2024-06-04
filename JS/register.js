document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Previene el envío del formulario por defecto

    // Llama a la función de validación y procede solo si devuelve true
    if (!validateRegisterForm()) {
        return; // Detiene la función aquí si la validación falla
    }

    // Si la validación es exitosa, obtiene los valores de los campos del formulario
    const fullName = document.getElementById('fullName').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const birthdate = document.getElementById('birthdate').value.trim();
    const address = document.getElementById('address').value.trim();

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
