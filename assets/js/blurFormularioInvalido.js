document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll('input:not([type="checkbox"]):not([type="radio"])');

    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            this.classList.add('touched');
        });
    });
});
