import { planos } from './planos.js';

document.addEventListener("DOMContentLoaded", function () {
    const planoSelecionado = localStorage.getItem('planoSelecionado');  // Read the selected plan from localStorage
    const planoInfo = planos[planoSelecionado];
    
    setTimeout(() => {
        window.location.href = `${planoInfo.pagamento}`; // Redirecionar para o Mercado Pago
    }, 5000); // Esperar 5 segundos (5000 milissegundos)
});