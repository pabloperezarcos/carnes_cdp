document.addEventListener('DOMContentLoaded', function () {
    const usersTable = document.getElementById('users-table');
    const userForm = document.getElementById('userForm');
    const userModalLabel = document.getElementById('userModalLabel');
    const userModal = new bootstrap.Modal(document.getElementById('userModal'));
    let editMode = false;
    let editUserId = null;

    const fetchUsers = async () => {
        const response = await fetch('/data/usuarios.json');
        const data = await response.json();
        renderUsers(data.usuarios);
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
        // Lógica para agregar el usuario
    };

    const editUser = (id) => {
        // Lógica para editar el usuario
    };

    const deleteUser = (id) => {
        // Lógica para eliminar el usuario
    };

    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        const password = document.getElementById('user-password').value;
        const role = document.getElementById('user-role').value;

        if (editMode) {
            // Lógica para actualizar el usuario
        } else {
            const newUser = { id: Date.now(), nombre: name, email: email, password: password, rol: role };
            addUser(newUser);
        }

        userModal.hide();
        fetchUsers();
    });

    fetchUsers();
});

function editUser(id) {
    // Lógica para obtener y mostrar los datos del usuario en el formulario
}

function deleteUser(id) {
    // Lógica para eliminar el usuario
}
