document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const fileInputPersonalizado = document.querySelector('.contato-formulario__input--upload');
    const fileNameSpan = document.querySelector(".file-name");

    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            fileNameSpan.textContent = fileInput.files[0].name;
            fileInputPersonalizado.classList.add('contato-formulario__input--upload-arquivo')
        }
    });
});
