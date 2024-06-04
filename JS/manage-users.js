document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM y variables para el modo de edición
    const usersTable = document.getElementById('users-table');
    const userForm = document.getElementById('userForm');
    const userModalLabel = document.getElementById('userModalLabel');
    const userModal = new bootstrap.Modal(document.getElementById('userModal'));
    let editMode = false;
    let editUserId = null;

    // Función para cargar usuarios desde el archivo JSON a localStorage si no existen
    const loadUsersFromJSON = () => {
        if (!localStorage.getItem('usuarios')) {
            fetch('../data/usuarios.json')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('usuarios', JSON.stringify(data.usuarios));
                    fetchUsers();
                });
        } else {
            fetchUsers();
        }
    };

    // Función para obtener usuarios desde localStorage
    const fetchUsers = () => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        renderUsers(usuarios);
    };

    // Función para renderizar usuarios en la tabla
    const renderUsers = (usuarios) => {
        usersTable.innerHTML = '';
        usuarios.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nombre}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.birthdate}</td>
                <td>${user.address}</td>
                <td>${user.rol}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editUser(${user.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="confirmDeleteUser(${user.id})">Eliminar</button>
                </td>
            `;
            usersTable.appendChild(row);
        });
    };

    // Función para agregar un nuevo usuario
    const addUser = (user) => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(user);
        saveAndRenderUsers(usuarios);
    };

    // Función para actualizar un usuario existente
    const updateUser = (updatedUser) => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const index = usuarios.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
            usuarios[index] = updatedUser;
            saveAndRenderUsers(usuarios);
        }
    };

    // Función para eliminar un usuario
    const deleteUser = (id) => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const updatedUsers = usuarios.filter(user => user.id !== id);
        saveAndRenderUsers(updatedUsers);
    };

    // Función para guardar usuarios en localStorage y renderizarlos
    const saveAndRenderUsers = (usuarios) => {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        renderUsers(usuarios);
    };

    // Función para editar un usuario
    window.editUser = (id) => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const user = usuarios.find(user => user.id === id);
        if (user) {
            editMode = true;
            editUserId = id;
            userModalLabel.textContent = 'Editar Usuario';
            document.getElementById('user-name').value = user.nombre;
            document.getElementById('user-username').value = user.username;
            document.getElementById('user-email').value = user.email;
            document.getElementById('user-password').value = user.password;
            document.getElementById('user-birthdate').value = user.birthdate;
            document.getElementById('user-address').value = user.address;
            document.getElementById('user-role').value = user.rol;
            userModal.show();
        }
    };

    // Función para confirmar la eliminación de un usuario
    window.confirmDeleteUser = (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            deleteUser(id);
        }
    };

    // Maneja el envío del formulario de usuario
    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('user-name').value;
        const username = document.getElementById('user-username').value;
        const email = document.getElementById('user-email').value;
        const password = document.getElementById('user-password').value;
        const birthdate = document.getElementById('user-birthdate').value;
        const address = document.getElementById('user-address').value;
        const role = document.getElementById('user-role').value;

        const user = {
            id: editMode ? editUserId : Date.now(),
            nombre: name,
            username: username,
            email: email,
            password: password,
            birthdate: birthdate,
            address: address,
            rol: role
        };

        if (editMode) {
            updateUser(user);
            editMode = false;
            editUserId = null;
        } else {
            addUser(user);
        }

        userModal.hide();
        setTimeout(() => {
            alert('Usuario guardado con éxito.');
        }, 500);
    });

    // Cargar los usuarios desde JSON al cargar la página
    loadUsersFromJSON();
});
