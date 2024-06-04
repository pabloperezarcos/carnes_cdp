// Validación del formulario de registro
function validateRegisterForm() {
    // Obtiene los valores de los campos del formulario
    const fullName = document.getElementById('fullName').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const birthdate = document.getElementById('birthdate').value.trim();

    // Verifica que todos los campos obligatorios estén llenos
    if (fullName === "" || username === "" || email === "" || password === "" || confirmPassword === "" || birthdate === "") {
        alert("Por favor, complete todos los campos obligatorios.");
        return false;
    }

    // Valida el formato del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    }

    // Verifica que la contraseña tenga entre 6 y 18 caracteres
    if (password.length < 6 || password.length > 18) {
        alert("La contraseña debe tener entre 6 y 18 caracteres.");
        return false;
    }

    // Valida que la contraseña contenga al menos un número, una letra mayúscula y un carácter especial
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{6,18}$/;
    if (!passwordPattern.test(password)) {
        alert("La contraseña debe contener al menos un número, una letra mayúscula y un carácter especial.");
        return false;
    }

    // Verifica que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return false;
    }

    // Calcula la edad del usuario a partir de la fecha de nacimiento
    const birthdateObj = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthdateObj.getFullYear();
    const monthDiff = today.getMonth() - birthdateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateObj.getDate())) {
        age--;
    }

    // Verifica que el usuario tenga al menos 13 años
    if (age < 13) {
        alert("Debe tener al menos 13 años para registrarse.");
        return false;
    }

    alert("Registro exitoso!");
    return true;
}

// Validación del formulario de inicio de sesión
function validateLoginForm() {
    // Obtiene los valores de los campos del formulario
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Verifica que todos los campos obligatorios estén llenos
    if (email === "" || password === "") {
        alert("Por favor, complete todos los campos.");
        return false;
    }

    // Valida el formato del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    }

    alert("Inicio de sesión exitoso!");
    return true;
}

// Validación del formulario de modificación de perfil
function validateModificarPerfilForm() {
    // Obtiene los valores de los campos del formulario
    const fullName = document.getElementById('fullName').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const birthdate = document.getElementById('birthdate').value.trim();

    // Verifica que los campos obligatorios estén llenos
    if (fullName === "" || username === "" || email === "" || birthdate === "") {
        alert("Por favor, complete todos los campos obligatorios.");
        return false;
    }

    // Valida el formato del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    }

    // Si las contraseñas no están vacías, se validan
    if (password !== "" || confirmPassword !== "") {
        if (password.length < 6 || password.length > 18) {
            alert("La contraseña debe tener entre 6 y 18 caracteres.");
            return false;
        }

        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{6,18}$/;
        if (!passwordPattern.test(password)) {
            alert("La contraseña debe contener al menos un número, una letra mayúscula y un carácter especial.");
            return false;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return false;
        }
    }

    // Calcula la edad del usuario a partir de la fecha de nacimiento
    const birthdateObj = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthdateObj.getFullYear();
    const monthDiff = today.getMonth() - birthdateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateObj.getDate())) {
        age--;
    }

    // Verifica que el usuario tenga al menos 13 años
    if (age < 13) {
        alert("Debe tener al menos 13 años.");
        return false;
    }

    alert("Perfil actualizado exitosamente!");
    return true;
}
