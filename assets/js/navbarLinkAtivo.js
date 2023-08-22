document.addEventListener("DOMContentLoaded", function () {
    // Pega a URL atual
    let currentUrl = window.location.href;

    // Pega todos os links na navbar
    let navbarLinks = document.querySelectorAll(".navbar__link");

    navbarLinks.forEach(link => {
        if (currentUrl.startsWith(link.href)) {
            link.classList.add("navbar__link--active");
        }
    });
});