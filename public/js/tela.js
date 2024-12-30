document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            // Redireciona para o dashboard após login bem-sucedido
            window.location.href = '/html/index.html';
        } else {
            // Exibe mensagem de erro em caso de login inválido
            const result = await response.json();
            alert(result.message || 'Erro ao tentar fazer login.');
        }
    } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        alert('Erro ao tentar fazer login.');
    } });
    