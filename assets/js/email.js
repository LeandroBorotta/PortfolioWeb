async function enviarFormulario(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    const data = {
      nome: nome,
      email: email,
      mensagem: mensagem
    };

    try {
      const response = await fetch('https://clubdeelite.com.br/api/enviarEmail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.status === 'success') {
        document.getElementById("alertSuccess").textContent = result.message;
        document.getElementById("alertSuccess").style.display = "block";

        document.getElementById('nome').value = "";
        document.getElementById('email').value = "";
        document.getElementById('mensagem').value = "";

        setTimeout(() => {
          document.getElementById("alertSuccess").style.display = "none";
        }, 2000);
      } else {
        alert('Erro: ' + result.message);
      }
    } catch (error) {
      alert('Erro ao enviar a mensagem: ' + error.message);
    }
  }