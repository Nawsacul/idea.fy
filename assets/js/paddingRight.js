function getDistanceFromRight(element) {
    var windowWidth = window.innerWidth;
    var rect = element.getBoundingClientRect();
    var distanceFromRight = windowWidth - (rect.left + element.offsetWidth);
    return distanceFromRight;
}

function mudarPadding(section) {
    var sectionBase = document.querySelector('.navbar__container');
    var distanciaBase = getDistanceFromRight(sectionBase);
    var secaoAlvo = document.querySelector(section);
    secaoAlvo.style.paddingRight = `${distanciaBase + 40}px`;
}

const handleResize = () => {
    const width = window.innerWidth;
    if (width > 1024 && width < 1439) {
        mudarPadding('.features');
    }
};

// Executa quando a página é carregada
window.addEventListener('load', handleResize);

// Executa quando a janela é redimensionada
window.addEventListener('resize', handleResize);

