$(document).ready(function () {
    $.getJSON('https://ipapi.co/json/')
        .done(function (data) {

            $('#locationData').html(`
            <p>Ubicación: ${data.city}, ${data.region}, ${data.country}</p>
            <p>Zona Horaria: ${data.timezone}</p>
        `);
        })
        .fail(function (error) {
            console.error('Error al obtener los datos de geolocalización:', error);
            $('#locationData').html('<p>Error al obtener la ubicación.</p>');
        });
});
$(document).ready(function() {
    let currentOrderId;

    $('.edit-btn').click(function() {
      currentOrderId = $(this).data('id');
      let $row = $('tr[data-id="' + currentOrderId + '"]');
      let username = $row.find('td:nth-child(2)').text();
      let products = $row.find('td:nth-child(3)').text();
      let address = $row.find('td:nth-child(4)').text();
      let status = $row.find('.status').text();

      $('#orderId').val(currentOrderId);
      $('#username').val(username);
      $('#products').val(products);
      $('#address').val(address);
      $('#status').val(status);

      $('#editModal').modal('show');
    });

    $('.save-btn').click(function() {
      let orderId = $('#orderId').val();
      let username = $('#username').val();
      let products = $('#products').val();
      let address = $('#address').val();
      let status = $('#status').val();

      let $row = $('tr[data-id="' + orderId + '"]');
      $row.find('td:nth-child(2)').text(username);
      $row.find('td:nth-child(3)').text(products);
      $row.find('td:nth-child(4)').text(address);
      $row.find('.status').text(status).removeClass().addClass('status').addClass(status);

      console.log("Guardar cambios para el pedido con ID: " + orderId);

      $('#editModal').modal('hide');
    });

    $('.delete-btn').click(function() {
      currentOrderId = $(this).closest('tr').data('id');
      $('#deleteModal').modal('show');
    });

    $('.confirm-delete-btn').click(function() {
      let orderId = currentOrderId;

      $('tr[data-id="' + orderId + '"]').remove();

      $('#deleteModal').modal('hide');
    });
  });
  function mostrarFormulario() {
    let formulario = document.getElementById("formularioContainer");
    if (formulario.style.display === "" || formulario.style.display === "none") {
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
}

$(document).ready(function () {
    $('#addUserForm').submit(function (e) {
        e.preventDefault();
        let nombre = $('#nombre').val();
        let email = $('#email').val();
        let rowCount = $('#userTable tr').length;
        let newRow = '<tr><td>' + rowCount + '</td><td>' + nombre + '</td><td>' + email + '</td><td><button class="btn btn-sm btn-primary editBtn" data-user-id="' + rowCount + '">Editar</button><button class="btn btn-sm btn-danger deleteBtn">Eliminar</button></td></tr>';
        $('#userTable tbody').append(newRow);
        $('#addUserForm').trigger("reset");
    });

    $('#userTable').on('click', '.deleteBtn', function () {
        $(this).closest('tr').remove();
        $('#userTable tbody tr').each(function (index) {
            $(this).find('td:first').text(index + 1);
        });
    });
 $('#userTable').on('click', '.editBtn', function () {
        let row = $(this).closest('tr');
        let email = row.find('td:eq(2)').text();

        $('#editNombre').val(row.find('td:eq(1)').text());
        $('#editEmail').val(email);
        $('#editUserForm').show().data('user-email', email); 
    });

    $('#editForm').submit(function (e) {
        e.preventDefault();
        let userEmail = $('#editUserForm').data('user-email'); 
        let nombre = $('#editNombre').val();
        let email = $('#editEmail').val();

        $('#userTable tbody tr').each(function () {
            if ($(this).find('td:eq(2)').text() === userEmail) {
                $(this).find('td:eq(1)').text(nombre);
                $(this).find('td:eq(2)').text(email);
                return false; 
            }
        });

        $('#editUserForm').hide();
    });

    $('#userTable').on('click', '.deleteBtn', function () {
        $(this).closest('tr').remove();
        $('#userTable tbody tr').each(function (index) {
            $(this).find('td:first').text(index + 1);
        });
    });
});
const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
      label: 'Ventas de Productos',
      data: [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300], // Datos de ventas ajustados
      backgroundColor: 'rgba(54, 162, 235, 0.5)', // Cambio el color del gráfico a un azul más claro
      borderColor: 'rgba(54, 162, 235, 1)', // Cambio el color del borde del gráfico a un azul más claro
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#fff' // Cambio el color del texto del eje Y a blanco
          }
        },
        x: {
          ticks: {
            color: '#fff' // Cambio el color del texto de los meses a blanco
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#fff' // Cambio el color del texto de la leyenda a blanco
          }
        }
      }
    }
  };

  // Inicializar el gráfico
  let myChart = new Chart(
    document.getElementById('ventasChart'),
    config
  );
  function incrementQuantity(input) {
    let quantityInput = input.parentNode.querySelector('.quantity-input');
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
    updateTotalPrice(input);
}

// Función para disminuir la cantidad
function decrementQuantity(input) {
    let quantityInput = input.parentNode.querySelector('.quantity-input');
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        updateTotalPrice(input);
    }
}

// Función para actualizar el precio total
function updateTotalPrice(input) {
    let row = input.parentNode.parentNode;
    let quantity = parseInt(row.querySelector('.quantity-input').value);
    let price = parseFloat(row.querySelectorAll('td')[3].textContent.replace('$', '').replace('.', '').replace(',', '.'));
    let totalPrice = quantity * price;
    row.querySelector('.total-clp').textContent = '$' + totalPrice.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    updateTotalCartPrice();
}

// Función para actualizar el precio total del carrito
function updateTotalCartPrice() {
    let totalPrice = 0;
    let rows = document.querySelectorAll('tbody tr');
    rows.forEach(function (row) {
        let price = parseFloat(row.querySelector('.total-clp').textContent.replace('$', '').replace('.', '').replace(',', '.'));
        totalPrice += price;
    });
    document.getElementById('totalPrice').textContent = '$' + totalPrice.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

// Función para eliminar una fila
function deleteRow(icon) {
    let row = icon.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotalCartPrice();
}

// Función para aplicar el descuento
function applyDiscount() {
    let discountCode = document.getElementById('discountCode').value;
    // Validar el código de descuento
    if (discountCode === 'ELMASGRANDE') {
        let totalPrice = parseFloat(document.getElementById('totalPrice').textContent.replace('$', '').replace('.', '').replace(',', '.'));
        let discountedPrice = totalPrice * 0.7; // Aplicar descuento del 30%
        document.getElementById('totalPrice').textContent = '$' + discountedPrice.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    } else {
        alert('Código de descuento inválido');
    }
}
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