document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const birthdate = document.getElementById('birthdate').value;
    const address = document.getElementById('address').value;

    // Validaciones
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Crear nuevo usuario
    const newUser = {
        id: Date.now(),
        nombre: fullName,
        email: email,
        password: password,
        rol: 'cliente',
        username: username,
        birthdate: birthdate,
        address: address
    };

    // Obtener usuarios existentes del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Agregar nuevo usuario
    usuarios.push(newUser);

    // Guardar usuarios actualizados en el localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Registro exitoso. Ahora puede iniciar sesión.');
    window.location.href = 'login.html';
});
