document.addEventListener("DOMContentLoaded", function () {
    // Pega o nome da página atual
    let pageName = window.location.pathname.split("/").pop();

    // Pega todos os links na navbar
    let navbarLinks = document.querySelectorAll(".navbar__link");

    navbarLinks.forEach(link => {
        if (link.getAttribute("href") === pageName) {
            link.classList.add("navbar__link--active");
        }
    });
});