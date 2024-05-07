function mostrarFormulario() {
    let formulario = document.getElementById("formularioContainer");
    if (formulario.style.display === "" || formulario.style.display === "none") {
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
}

function agregarCamiseta() {
    let nombre = document.getElementById('nombre').value;
    let precio = document.getElementById('precio').value;

    // Verificar si el nombre y el precio están presentes
    if (nombre.trim() === '' || precio.trim() === '') {
        alert('Por favor ingresa tanto el nombre como el precio de la camiseta.');
        return; // Salir de la función si falta alguno de los campos
    }

    let imagen = document.getElementById('imagen').files[0];
    let imagenURL = URL.createObjectURL(imagen);

    let nuevaCamiseta = {
        nombre: nombre,
        precio: precio,
        imagen: imagenURL
    };
    camisetas.push(nuevaCamiseta);
    mostrarCamisetas();
    document.getElementById('formularioCamiseta').reset();
    let formulario = document.getElementById("formularioContainer");
    formulario.style.display = "none";
}
let camisetas = [
    { nombre: "Camiseta Colo Colo 2024", precio: "$60.000", imagen: "img/coload.webp" },
    { nombre: "Camiseta de Universidad de Chiste", precio: "$1", imagen: "img/udechiste.jpg" },
    { nombre: "Camiseta Argentina Messi", precio: "$60.000", imagen: "img/argentina.jpg" },
    { nombre: "Camiseta de Real Madrid Monicius", precio: "$80.000", imagen: "img/real_madrid.png" },
    { nombre: "Camiseta de Manchester City", precio: "$79.990", imagen: "img/manchester.jpg" },
    { nombre: "Camiseta de Arsenal Gabriel Jesus", precio: "$79.990", imagen: "img/arsenal.jpg" },
    { nombre: "Camiseta de Barcelona", precio: "$79.990", imagen: "img/barca1.jpg" },
    { nombre: "Camiseta de Inter Barella", precio: "$79.990", imagen: "img/inter.jpg" },
    { nombre: "Camiseta de Juventus", precio: "$79.990", imagen: "img/juve.jpg" }
];

function mostrarFormularioEdicion(index) {
    let camiseta = camisetas[index];
    document.getElementById("editNombre").value = camiseta.nombre;
    document.getElementById("editPrecio").value = camiseta.precio.replace('$', ''); // Remover el símbolo de dólar
    document.getElementById("editIndex").value = index;
    document.getElementById("formularioEditar").style.display = "block";
}

function eliminarCamisetaDesdeFormulario() {
    let index = document.getElementById("editIndex").value;
    camisetas.splice(index, 1);
    mostrarCamisetas();
    cancelarEdicion();
}

function guardarEdicion() {
    let index = document.getElementById("editIndex").value;
    camisetas[index].nombre = document.getElementById("editNombre").value;
    camisetas[index].precio = '$' + document.getElementById("editPrecio").value; // Agregar el símbolo de dólar
    mostrarCamisetas();
    cancelarEdicion();
}

function cancelarEdicion() {
    document.getElementById("formularioEditar").style.display = "none";
}

function mostrarCamisetas() {
    let contenedorItems = document.getElementById("contenedorItems");
    contenedorItems.innerHTML = "";

    camisetas.forEach(function (camiseta, index) {
        let itemHTML = `
                <div class="item">
                    <span class="titulo-item">${camiseta.nombre}</span>
                    <img src="${camiseta.imagen}" alt="" class="img-item">
                    <span class="precio-item">${camiseta.precio}</span>
                    <button class="boton-item" onclick="mostrarFormularioEdicion(${index})">Editar</button>
                </div>
            `;
        contenedorItems.innerHTML += itemHTML;
    });
}

window.onload = function () {
    mostrarCamisetas();
};
const ciudadesPorRegion = {
    "Arica y Parinacota": ["Arica", "Putre"],
    "Tarapacá": ["Iquique", "Alto Hospicio"],
    "Antofagasta": ["Antofagasta", "Calama", "Tocopilla"],
    "Atacama": ["Copiapó", "Vallenar", "Chañaral"],
    "Coquimbo": ["La Serena", "Coquimbo", "Ovalle"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
    "Metropolitana de Santiago": ["Santiago", "Maipú", "Puente Alto"],
    "Libertador General Bernardo O'Higgins": ["Rancagua", "Rengo", "San Fernando"],
    "Maule": ["Talca", "Curicó", "Linares"],
    "Ñuble": ["Chillán", "Chillán Viejo", "San Carlos"],
    "Biobío": ["Concepción", "Talcahuano", "Chillán"],
    "La Araucanía": ["Temuco", "Angol", "Victoria"],
    "Los Ríos": ["Valdivia", "La Unión", "Río Bueno"],
    "Los Lagos": ["Puerto Montt", "Osorno", "Puerto Varas"],
    "Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Puerto Aysén", "Chile Chico"],
    "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Puerto Natales", "Porvenir"]
};

function cargarCiudades() {
    const regionSeleccionada = document.getElementById("region").value;
    const ciudadDropdown = document.getElementById("ciudad");
    ciudadDropdown.innerHTML = '<option value="">Selecciona una ciudad</option>';
    const ciudades = ciudadesPorRegion[regionSeleccionada];
    if (ciudades) {
        ciudades.forEach(ciudad => {
            const opcion = document.createElement("option");
            opcion.text = ciudad;
            opcion.value = ciudad;
            ciudadDropdown.add(opcion);
        });
    }
}

function mostrarAlerta(region, ciudad, direccion) {
    let alertaExistente = document.getElementById('alerta');
    if (alertaExistente) {
        alertaExistente.remove();
    }
    let alerta = document.createElement('div');
    alerta.id = 'alerta';
    alerta.classList.add('alerta');
    alerta.innerHTML = `
        <p>Tu pedido será enviado a la región de ${region}, ciudad de ${ciudad}, a la dirección: ${direccion}. El pedido estaria llegando en 5 días.</p>
        <button class="boton" onclick="irAPagar()">Ir a Pagar</button>
    `;
    document.body.appendChild(alerta);
}
function validarEmail(input) {
var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correo electrónico
if (!regex.test(input.value)) {
    document.getElementById('email-error').innerText = "Por favor, introduce un correo electrónico válido.";
    input.classList.add('error-input');
} else {
    document.getElementById('email-error').innerText = "";
    input.classList.remove('error-input');
}
}

document.getElementById('email').addEventListener('input', function() {
validarEmail(this);
});
function validarTelefono(input) {
    let regex = /^\d+$/; // Expresión regular que permite solo números
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^\d]/g, ''); // Limpiar el campo si se ingresa algo que no es número
    }
}

document.getElementById('telefono').addEventListener('input', function () {
    validarTelefono(this); // Llamar a la función de validación cuando se ingrese algo en el campo de teléfono
});


document.getElementById('telefono').addEventListener('input', function () {
    validarTelefono(this); // Llamar a la función de validación cuando se ingrese algo en el campo de teléfono
});

document.getElementById('formularioEnvio').addEventListener('submit', function (event) {
    event.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;
    let region = document.getElementById('region').value;
    let ciudad = document.getElementById('ciudad').value;
    let direccion = document.getElementById('direccion').value;

    if (nombre && email && telefono && region && ciudad && direccion) {
        mostrarAlerta(region, ciudad, direccion);
    } else {
        alert('Por favor, completa todos los campos del formulario.');
    }
});


function irAPagar() {
    window.location.href = 'pago.html';
}
function cargarDatos() {
         
    let pedidoId = "1";
    let usuario = "Usuario 1";
    let productos = "Camiseta Colo Colo 2024, Camiseta Argentina Messi";
    let direccion = "Concepcion, Paicavi 3280";

  
    document.getElementById("idCliente").value = pedidoId;
    document.getElementById("nombreCliente").value = usuario;
    document.getElementById("productos").value = productos;
    document.getElementById("direccionCliente").value = direccion;
}

function generarFactura() {

    let idCliente = document.getElementById("idCliente").value;
    let nombreCliente = document.getElementById("nombreCliente").value;
    let direccionCliente = document.getElementById("direccionCliente").value;
    let productos = document.getElementById("productos").value;


    let factura = "Factura\n\n";
    factura += "Número Id: " + idCliente + "\n";
    factura += "Nombre Cliente: " + nombreCliente + "\n";
    factura += "Dirección: " + direccionCliente + "\n";
    factura += "Productos: " + productos;

  
    let ventanaFactura = window.open("", "_blank");
    ventanaFactura.document.write("<pre>" + factura + "</pre>");
}
function validateForm() {
    let cardHolderName = document.getElementById('card-holder-name').value;
    let cardNumber = document.getElementById('card-number').value;
    let expiryDate = document.getElementById('expiry-date').value;
    let cvc = document.getElementById('cvc').value;
    let address = document.getElementById('address').value;

    let dateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    let cardNumberRegex = /^\d+$/; // Expresión regular para permitir solo dígitos

    // Validación para verificar si el número de tarjeta contiene letras
    if (!cardNumber.match(cardNumberRegex)) {
        document.getElementById('error-message').innerHTML = "El número de tarjeta solo puede contener dígitos.";
        document.getElementById('success-message').innerHTML = "";
        return false;
    }

    if (cardHolderName === "" || cardNumber === "" || expiryDate === "" || cvc === "" || address === "") {
        document.getElementById('error-message').innerHTML = "Por favor, llene todos los campos.";
        document.getElementById('success-message').innerHTML = ""; 
        return false;
    } else if (!expiryDate.match(dateRegex)) {
        document.getElementById('error-message').innerHTML = "Por favor, ingrese una fecha de expiración válida (MM/YY).";
        document.getElementById('success-message').innerHTML = "";
        return false;
    } else {
        document.getElementById('success-message').innerHTML = "¡Pago exitoso!";
        document.getElementById('error-message').innerHTML = ""; 
        return true;
    }
}
function validateKeyPress(event) {
    let keyCode = event.keyCode || event.which;
    let isValidKey = (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || keyCode === 32;
    if (!isValidKey) {
        event.preventDefault();
    }
}


