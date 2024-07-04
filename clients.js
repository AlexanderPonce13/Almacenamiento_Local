document.addEventListener('DOMContentLoaded', function() { // Espera a que el contenido del DOM esté completamente cargado
    let clientsList = document.getElementById('clientsList'); // Obtiene el elemento donde se mostrará la lista de clientes
    let clients = localStorage.getItem('clients'); // Obtiene la lista de clientes almacenada en LocalStorage
    clients = clients ? JSON.parse(clients) : []; // Si hay datos, los parsea, sino inicializa como un array vacío

    if (clients.length === 0) { // Si no hay clientes registrados
        clientsList.innerHTML = '<p>No hay clientes registrados.</p>'; // Muestra un mensaje indicando que no hay clientes
        return; // Termina la ejecución del script
    }

    let table = document.createElement('table'); // Crea una tabla para mostrar los clientes
    table.innerHTML = ` <!-- Define la estructura de la tabla -->
        <tr>
            <th>Cédula</th>
            <th>Apellidos</th>
            <th>Nombres</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Correo Electrónico</th>
            <th>Acciones</th>
        </tr>
    `;

    clients.forEach((client, index) => { // Recorre la lista de clientes
        let row = document.createElement('tr'); // Crea una nueva fila para cada cliente
        row.innerHTML = ` <!-- Define el contenido de cada fila con los datos del cliente -->
            <td>${client.cedula}</td>
            <td>${client.apellidos}</td>
            <td>${client.nombres}</td>
            <td>${client.direccion}</td>
            <td>${client.telefono}</td>
            <td>${client.correo}</td>
            <td><button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button></td> <!-- Botón para eliminar el cliente -->
        `;
        table.appendChild(row); // Añade la fila a la tabla
    });

    clientsList.appendChild(table); // Añade la tabla al contenedor de la lista de clientes

    document.querySelectorAll('.delete-btn').forEach(button => { // Añade eventos a los botones de eliminar
        button.addEventListener('click', function() { // Evento click para el botón de eliminar
            let index = this.getAttribute('data-index'); // Obtiene el índice del cliente a eliminar
            Swal.fire({ // Muestra una alerta de confirmación
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo'
            }).then((result) => {
                if (result.isConfirmed) { // Si el usuario confirma la eliminación
                    clients.splice(index, 1); // Elimina el cliente del array
                    localStorage.setItem('clients', JSON.stringify(clients)); // Actualiza el LocalStorage
                    location.reload(); // Recarga la página para reflejar los cambios
                }
            });
        });
    });
});
