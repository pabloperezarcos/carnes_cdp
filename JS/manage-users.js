document.addEventListener('DOMContentLoaded', function () {
    const usersTable = document.getElementById('users-table');
    const userForm = document.getElementById('userForm');
    const userModalLabel = document.getElementById('userModalLabel');
    const userModal = new bootstrap.Modal(document.getElementById('userModal'));
    let editMode = false;
    let editUserId = null;

    // Cargar usuarios desde el archivo JSON a localStorage si no existen
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

    const fetchUsers = () => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        renderUsers(usuarios);
    };

    const renderUsers = (usuarios) => {
        usersTable.innerHTML = '';
        usuarios.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nombre}</td>
                <td>${user.email}</td>
                <td>${user.rol}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editUser(${user.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Eliminar</button>
                </td>
            `;
            usersTable.appendChild(row);
        });
    };

    const addUser = (user) => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(user);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        fetchUsers();
    };

    const updateUser = (updatedUser) => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const index = usuarios.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
            usuarios[index] = updatedUser;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            fetchUsers();
        }
    };

    const deleteUser = (id) => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const updatedUsers = usuarios.filter(user => user.id !== id);
        localStorage.setItem('usuarios', JSON.stringify(updatedUsers));
        fetchUsers();
    };

    window.editUser = (id) => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const user = usuarios.find(user => user.id === id);
        if (user) {
            editMode = true;
            editUserId = id;
            userModalLabel.textContent = 'Editar Usuario';
            document.getElementById('user-name').value = user.nombre;
            document.getElementById('user-email').value = user.email;
            document.getElementById('user-password').value = user.password;
            document.getElementById('user-role').value = user.rol;
            userModal.show();
        }
    };

    window.deleteUser = (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            deleteUser(id);
        }
    };

    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        const password = document.getElementById('user-password').value;
        const role = document.getElementById('user-role').value;

        if (editMode) {
            const updatedUser = { id: editUserId, nombre: name, email: email, password: password, rol: role };
            updateUser(updatedUser);
        } else {
            const newUser = { id: Date.now(), nombre: name, email: email, password: password, rol: role };
            addUser(newUser);
        }

        userModal.hide();
        fetchUsers();
    });

    loadUsersFromJSON();
});
