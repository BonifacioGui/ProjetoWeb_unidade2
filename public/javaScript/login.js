document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const emailInput = document.getElementById('login-email');
        const senhaInput = document.getElementById('login-senha');

        // Verifique os dados que estão sendo enviados
        console.log('Enviando dados para o servidor:', {
            email: emailInput.value.trim(),
            senha: senhaInput.value.trim()
        });

        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailInput.value.trim(),
                senha: senhaInput.value.trim()
            })
        })
        .then(response => {
            console.log('Response status:', response.status); 
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data); 
            if (data.success) {
                showSuccess(data.message);
                setTimeout(() => {
                    window.location.href = '/html/index.html'; 
                }, 1000);
            } else {
                showError(data.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            showError('Ocorreu um erro ao realizar o login.');
        });
    });

    function showError(message) {
        const formError = document.getElementById('login-formError');
        if (formError) {
            formError.textContent = message;
            formError.style.color = "red";
            formError.style.display = "block";
            setTimeout(() => {
                formError.style.display = "none";
            }, 5000);
        }
    }

    function showSuccess(message) {
        const formSuccess = document.getElementById('login-formSuccess');
        if (formSuccess) {
            formSuccess.textContent = message;
            formSuccess.style.color = "green";
            formSuccess.style.display = "block";
            setTimeout(() => {
                formSuccess.style.display = "none";
            }, 3000);
        }
    }
});
