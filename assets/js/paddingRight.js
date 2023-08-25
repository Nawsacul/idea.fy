let timer;

// Cache dos elementos para evitar repetidas chamadas ao DOM
const sectionBase = document.querySelector('.navbar__container');
const secaoAlvo = document.querySelector('.info');

function getDistanceFromRight(element) {
    const windowWidth = window.innerWidth;
    const rect = element.getBoundingClientRect();
    return windowWidth - (rect.left + element.offsetWidth);
}

function mudarPadding(remove = false) {
    const distanciaBase = getDistanceFromRight(sectionBase);
    
    if (remove) {
        secaoAlvo.style.paddingRight = `${distanciaBase + 40}px`;
    } else {
        secaoAlvo.style.removeProperty('padding-right');
    }
}

function handleResize() {
    clearTimeout(timer); // Limpa o timer anterior
    timer = setTimeout(() => { // Adiciona um debounce para otimizar a escuta do redimensionamento
        const width = window.innerWidth;
        if (width > 1024 && width < 1439) {
            mudarPadding(true);
        } else {
            mudarPadding(false);
        }
    }, 0); // 100ms de delay
}

// EventListeners
window.addEventListener('load', handleResize);
window.addEventListener('resize', handleResize);