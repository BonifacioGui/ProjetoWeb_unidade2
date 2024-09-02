document.addEventListener('DOMContentLoaded', function() {
    // Formata o telefone
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(event) {
            let value = phoneInput.value.replace(/\D/g, ''); 
            if (value.length > 11) value = value.substring(0, 11); 
            if (value.length > 6) {
                value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
            } else if (value.length > 2) {
                value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}`;
            } else {
                value = `(${value}`;
            }
            phoneInput.value = value;
        });
    }

    // Exibe a mensagem de sucesso, se houver
    const formSuccess = document.getElementById('form-success');
    if (formSuccess) {
        const successMessage = localStorage.getItem('form-success');
        if (successMessage) {
            formSuccess.textContent = successMessage;
            formSuccess.style.display = "block";
            setTimeout(() => {
                formSuccess.style.display = "none";
                localStorage.removeItem('form-success');
            }, 5000); 
        }
    }

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário
        let valid = true;
        const errorMessages = {
            email: "Digite um email válido.",
            senha: "A senha é obrigatória."
        };

        const emailInput = document.getElementById('login-email');
        const senhaInput = document.getElementById('login-senha');
        const formError = document.getElementById('login-formError');
        formError.textContent = "";

        if (emailInput && !emailInput.checkValidity()) {
            document.getElementById('login-emailError').textContent = errorMessages.email;
            valid = false;
        } else {
            document.getElementById('login-emailError').textContent = "";
        }

        if (senhaInput && senhaInput.value.trim() === '') {
            document.getElementById('login-senhaError').textContent = errorMessages.senha;
            valid = false;
        } else {
            document.getElementById('login-senhaError').textContent = "";
        }

        if (!valid) {
            showError("Por favor, corrija os erros acima.");
        } else {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === emailInput.value.trim() && user.senha === senhaInput.value.trim());

            if (user) {
                formError.textContent = "";
                showSuccess("Login realizado com sucesso!");
                setTimeout(() => {
                    window.location.href = '/html/index.html';
                }, 1000); 
            } else {
                showError("Email ou senha incorretos.");
            }
        }
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
        const formSuccess = document.getElementById('login-formSuccess'); // Novo elemento para mensagens de sucesso
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
