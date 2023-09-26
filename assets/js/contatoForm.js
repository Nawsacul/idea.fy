const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Impede a atualização da página

  const formData = new FormData(contactForm);

  fetch('assets/php/enviarContato.php', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Oculta o formulário
        document.getElementById('contact-form').style.display = 'none';
        // Exibe a mensagem de sucesso
        document.querySelector('.contato-formulario__mensagem-sucesso').style.display = 'flex';
      } else {
        // Mensagem de erro
        alert('Erro ao enviar a mensagem.');
      }
    })
    .catch((error) => console.error('Error:', error));
});
