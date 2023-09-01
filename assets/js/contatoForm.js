// document.getElementById('contact-form').addEventListener('submit', function (e) {
//   e.preventDefault(); // Impede a atualização da página

//   // Pegar os valores dos campos do formulário
//   var nome = document.getElementById('nome').value;
//   var email = document.getElementById('email').value;
//   var telefone = document.getElementById('telefone').value;
//   var mensagem = document.getElementById('mensagem').value;

//   // Cria um objeto com os dados do formulário
//   var formData = {
//     nome: nome,
//     email: email,
//     telefone: telefone,
//     mensagem: mensagem
//   };

//   // Faz uma requisição POST para o servidor com os dados do formulário
//   fetch('url_do_servidor', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(formData)
//   })
//     .then(function (response) {
//       return response.text(); // ou response.text() se a resposta for uma string
//     })
//     .then(function (data) {
//       // Aqui você pode tratar a resposta do servidor

//       // Oculta o formulário
//       document.getElementById('contact-form').style.display = 'none';

//       // Exibe a mensagem de sucesso
//       document.getElementById('success-message').style.display = 'block';
//     })
//     .catch(function (error) {
//       console.error('Ocorreu um erro ao enviar o formulário:', error);
//       // Aqui você pode tratar o erro, por exemplo, exibir uma mensagem de erro para o usuário
//     });
// });

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Impede a atualização da página

  // Aqui, você pode pegar os valores dos campos do formulário e enviar para o servidor
  // ...

  // Oculta o formulário
  document.getElementById('contact-form').style.display = 'none';

  // Exibe a mensagem de sucesso
  document.querySelector('.contato-formulario__mensagem-sucesso').style.display = 'flex';
});
