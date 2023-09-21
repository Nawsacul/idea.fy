// Funções para manipulação de cookies
function definirCookie(nome, valor, dias) {
    let data = new Date();
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
    let expires = "expires=" + data.toUTCString();
    document.cookie = nome + "=" + valor + ";" + expires + ";path=/";
}

function obterCookie(nome) {
    let nomeCookie = nome + "=";
    let cookiesDecodificados = decodeURIComponent(document.cookie);
    let cookies = cookiesDecodificados.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(nomeCookie) === 0) {
            return c.substring(nomeCookie.length, c.length);
        }
    }
    return "";
}

function cookieExiste(nome) {
    let cookie = obterCookie(nome);
    return cookie !== "";
}

// Lógica para manipular a notificação de cookies
document.addEventListener('DOMContentLoaded', function () {
    const notificacaoCookies = document.querySelector('.notificacao-cookies');
    const botaoPreferencias = notificacaoCookies.querySelector('.notificacao-cookies__botao--preferencias');
    const botaoAceitar = notificacaoCookies.querySelector('.notificacao-cookies__botao--aceitar');
    const secaoPreferencias = notificacaoCookies.querySelector('.notificacao-cookies__preferencias');
    const cookiesContainer = notificacaoCookies.querySelector('.notificacao-cookies__container');

    // Se o usuário já aceitou os cookies, esconda a notificação
    if (cookieExiste('cookiesAceitos')) {
        notificacaoCookies.style.display = 'none';
    }

    botaoPreferencias.addEventListener('click', function () {
        if (secaoPreferencias.style.display === 'none') {
            secaoPreferencias.style.display = 'flex';
            cookiesContainer.style.display = 'none';
            botaoPreferencias.innerHTML = 'Confirmar Escolhas';
        } else {
            secaoPreferencias.style.display = 'none';
            cookiesContainer.style.display = 'flex';
            botaoPreferencias.innerHTML = 'Preferências';
        }
    });

    botaoAceitar.addEventListener('click', function () {
        // Definir os cookies conforme a escolha do usuário
        let cookieEssencial = document.getElementById('cookieEssencial').checked;
        let cookieEstatistica = document.getElementById('cookieEstatistica').checked;
        let cookieMarketing = document.getElementById('cookieMarketing').checked;

        definirCookie('cookieEssencial', cookieEssencial, 365); // Válido por 365 dias
        definirCookie('cookieEstatistica', cookieEstatistica, 365);
        definirCookie('cookieMarketing', cookieMarketing, 365);
        definirCookie('cookiesAceitos', true, 365); // Para verificar se o usuário já aceitou os cookies

        notificacaoCookies.style.display = 'none';
    });
});