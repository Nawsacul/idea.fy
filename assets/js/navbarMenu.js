function toggleOrRemoveClasses(elements, className, remove = false) {
    elements.forEach((element) => {
        if (remove) {
            element.classList.remove(className);
        } else {
            element.classList.toggle(className);
        }
    });
}

var menu = document.querySelector('.navbar__mobile-menu');
var navbarNav = document.querySelector('.navbar__nav');
var navbarLink = document.querySelectorAll('.navbar__link');
var navbarLinkSpan = document.querySelectorAll('.navbar__link-texto');
var overlay = document.getElementById('overlay');

menu.addEventListener('click', () => {
    toggleOrRemoveClasses(navbarLink, 'link');
    toggleOrRemoveClasses(navbarLinkSpan, 'link__texto');
    navbarNav.classList.toggle('navbar__nav--aberta');

    if (navbarNav.classList.contains('navbar__nav--aberta')) {
        overlay.style.display = 'block'; // Mostrar o overlay quando o menu estiver aberto
    } else {
        overlay.style.display = 'none'; // Ocultar o overlay quando o menu estiver fechado
    }
});

overlay.addEventListener('click', () => {
    toggleOrRemoveClasses(navbarLink, 'link', true);
    toggleOrRemoveClasses(navbarLinkSpan, 'link__texto', true);
    navbarNav.classList.remove('navbar__nav--aberta');
    overlay.style.display = 'none'; // Ocultar o overlay
});

window.addEventListener('scroll', () => {
    if (navbarNav.classList.contains('navbar__nav--aberta')) {
        toggleOrRemoveClasses(navbarLink, 'link', true);
        toggleOrRemoveClasses(navbarLinkSpan, 'link__texto', true);
        navbarNav.classList.remove('navbar__nav--aberta');
        overlay.style.display = 'none'; // Ocultar o overlay
    }
}, false);

window.onresize = () => {
    if (window.innerWidth > 768 && navbarNav.classList.contains('navbar__nav--aberta')) {
        toggleOrRemoveClasses(navbarLink, 'link', true);
        toggleOrRemoveClasses(navbarLinkSpan, 'link__texto', true);
        navbarNav.classList.remove('navbar__nav--aberta');

        overlay.style.display = 'none'; // Ocultar o overlay se o menu estiver aberto e a janela for redimensionada
    }
};