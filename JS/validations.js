// validations.js

function validateRegisterForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const birthdate = document.getElementById('birthdate').value.trim();

    if (fullName === "" || username === "" || email === "" || password === "" || confirmPassword === "" || birthdate === "") {
        alert("Por favor, complete todos los campos obligatorios.");
        return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    }

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

    const birthdateObj = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthdateObj.getFullYear();
    const monthDiff = today.getMonth() - birthdateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateObj.getDate())) {
        age--;
    }

    if (age < 13) {
        alert("Debe tener al menos 13 años para registrarse.");
        return false;
    }

    alert("Registro exitoso!");
    return true;
}
