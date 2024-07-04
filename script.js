// Agrega un evento al formulario para manejar la acción de enviar
document.getElementById('clientForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene la acción por defecto del formulario (enviar)

    // Obtiene los valores de los campos del formulario
    const cedula = document.getElementById('cedula').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const nombres = document.getElementById('nombres').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();

    // Validaciones con expresiones regulares
    const cedulaRegex = /^[0-9]{10}$/;  // Exactamente 10 dígitos
    const nombreApellidoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;  // Solo letras y espacios
    const telefonoRegex = /^[0-9]{10}$/;  // Exactamente 10 dígitos
    const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;  // Formato estándar de email

    // Validación de campos obligatorios
    if (!cedula || !apellidos || !nombres || !direccion || !telefono || !correo) {
        showAlert('Todos los campos son obligatorios.', 'error'); // Muestra alerta si algún campo está vacío
        return;
    }

    // Validación de cédula
    if (!cedulaRegex.test(cedula)) {
        if (cedula.length < 10) {
            showAlert('La cédula debe tener exactamente 10 dígitos.', 'error'); // Muestra alerta si la cédula no tiene exactamente 10 dígitos
        } else {
            showAlert('La cédula solo debe contener dígitos numéricos.', 'error'); // Muestra alerta si la cédula contiene caracteres no numéricos
        }
        return;
    }

    // Validación de apellidos
    if (!nombreApellidoRegex.test(apellidos)) {
        showAlert('Los apellidos solo deben contener letras y espacios.', 'error'); // Muestra alerta si los apellidos contienen caracteres no permitidos
        return;
    }

    // Validación de nombres
    if (!nombreApellidoRegex.test(nombres)) {
        showAlert('Los nombres solo deben contener letras y espacios.', 'error'); // Muestra alerta si los nombres contienen caracteres no permitidos
        return;
    }

    // Validación de teléfono
    if (!telefonoRegex.test(telefono)) {
        showAlert('El teléfono debe tener exactamente 10 dígitos.', 'error'); // Muestra alerta si el teléfono no tiene exactamente 10 dígitos
        return;
    }

    // Validación de correo electrónico
    if (!correoRegex.test(correo)) {
        showAlert('El correo electrónico no tiene un formato válido.', 'error'); // Muestra alerta si el correo electrónico no tiene un formato válido
        return;
    }

    // Verifica si el cliente ya está registrado
    const clientExists = verifyClientExists(cedula, telefono, correo);
    if (clientExists) {
        showAlert(clientExists, 'error'); // Muestra alerta si el cliente ya está registrado
        return;
    }

    // Si todo está correcto, guarda el cliente
    const newClient = { cedula, apellidos, nombres, direccion, telefono, correo }; // Crea un objeto con los datos del cliente
    saveClient(newClient); // Guarda el cliente

    // Limpia los campos del formulario
    document.getElementById('clientForm').reset();
    showAlert('Cliente registrado con éxito.', 'success'); // Muestra alerta de éxito
});

// Muestra una alerta utilizando SweetAlert2
function showAlert(message, type) {
    Swal.fire({
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}

// Guarda el cliente en localStorage
function saveClient(client) {
    let clients = localStorage.getItem('clients'); // Obtiene los clientes del localStorage
    clients = clients ? JSON.parse(clients) : []; // Si hay clientes, los parsea, si no, crea un array vacío
    clients.push(client); // Agrega el nuevo cliente al array
    localStorage.setItem('clients', JSON.stringify(clients)); // Guarda el array de clientes en localStorage
}

// Verifica si el cliente ya está registrado
function verifyClientExists(cedula, telefono, correo) {
    let clients = localStorage.getItem('clients'); // Obtiene los clientes del localStorage
    clients = clients ? JSON.parse(clients) : []; // Si hay clientes, los parsea, si no, crea un array vacío
    for (let client of clients) { // Itera sobre los clientes
        if (client.cedula === cedula) {
            return 'Cédula ya registrada.'; // Retorna mensaje si la cédula ya está registrada
        }
        if (client.telefono === telefono) {
            return 'Teléfono ya registrado.'; // Retorna mensaje si el teléfono ya está registrado
        }
        if (client.correo === correo) {
            return 'Correo electrónico ya registrado.'; // Retorna mensaje si el correo electrónico ya está registrado
        }
    }
    return null; // Retorna null si el cliente no está registrado
}
