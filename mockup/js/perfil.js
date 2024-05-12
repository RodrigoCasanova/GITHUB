document.getElementById("editar-btn").addEventListener("click", function () {
    let inputs = document.querySelectorAll(".form-control");
    inputs.forEach(function (input) {
        input.removeAttribute("disabled");
    });
    document.getElementById("editar-btn").classList.add("d-none");
    document.getElementById("guardar-btn").classList.remove("d-none");
    document.getElementById("cancelar-btn").classList.remove("d-none");
});

document.getElementById("guardar-btn").addEventListener("click", function () {
    let inputs = document.querySelectorAll(".form-control");
    inputs.forEach(function (input) {
        input.setAttribute("disabled", "disabled");
    });
    document.getElementById("editar-btn").classList.remove("d-none");
    document.getElementById("guardar-btn").classList.add("d-none");
    document.getElementById("cancelar-btn").classList.add("d-none");
});

document.getElementById("cancelar-btn").addEventListener("click", function () {
    let inputs = document.querySelectorAll(".form-control");
    inputs.forEach(function (input) {
        input.setAttribute("disabled", "disabled");
    });
    document.getElementById("editar-btn").classList.remove("d-none");
    document.getElementById("guardar-btn").classList.add("d-none");
    document.getElementById("cancelar-btn").classList.add("d-none");
});

document.getElementById("perfil-form").addEventListener("submit", function (event) {
    event.preventDefault();
    let formData = new FormData(this);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "guardar_perfil.php"); 
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Perfil guardado exitosamente.");
            let inputs = document.querySelectorAll(".form-control");
            inputs.forEach(function (input) {
                input.setAttribute("disabled", "disabled");
            });
            document.getElementById("editar-btn").classList.remove("d-none");
            document.getElementById("guardar-btn").classList.add("d-none");
            document.getElementById("cancelar-btn").classList.add("d-none"); // Ocultar botón Cancelar
        }
    };
    xhr.send(formData);
});
