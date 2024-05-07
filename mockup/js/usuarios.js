document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('togglePassword').addEventListener('click', function () {
        let contrasenaInput = document.getElementById('contrasena');
        let botonToggle = document.getElementById('togglePassword');

        if (contrasenaInput.type === 'password') {
            contrasenaInput.type = 'text';
            botonToggle.textContent = 'Ocultar';
        } else {
            contrasenaInput.type = 'password';
            botonToggle.textContent = 'Mostrar';
        }
    });
});
