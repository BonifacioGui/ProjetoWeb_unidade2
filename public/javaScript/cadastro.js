document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('telefone');

    
    phoneInput.addEventListener('input', function() {
        let value = phoneInput.value.replace(/\D/g, '');  

        
        if (value.length > 11) {
            value = value.substring(0, 11); 
        }

        
        if (value.length > 6) {
            value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
        } else if (value.length > 2) {
            value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}`;
        } else {
            value = `(${value}`;
        }

        phoneInput.value = value;
    });

   
    const formSuccess = document.getElementById('form-success');
    const successMessage = localStorage.getItem('form-success');
    if (successMessage) {
        formSuccess.textContent = successMessage;
        formSuccess.style.display = "block";
        localStorage.removeItem('form-success');  
    }

    const form = document.getElementById('cadastro-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            console.log("Formulário enviado");
            event.preventDefault(); 

            let valid = true;
            const errorMessages = {
                nome: "Este campo é obrigatório e não pode conter números.",
                sobrenome: "Este campo é obrigatório e não pode conter números.",
                email: "Digite um email válido.",
                telefone: "Digite um número de telefone válido no formato (99) 99999-9999.",
                idade: "Digite uma idade válida entre 1 e 130.",
                senha: "A senha deve ter pelo menos 6 caracteres.",
                confirmeSenha: "As senhas devem ser iguais."
            };

            // Campos do formulário
            const nomeInput = document.getElementById('nome');
            const sobrenomeInput = document.getElementById('sobrenome');
            const emailInput = document.getElementById('email');
            const idadeInput = document.getElementById('idade');
            const senhaInput = document.getElementById('senha');
            const confirmeSenhaInput = document.getElementById('confirme-senha');


            document.querySelectorAll('.error-message').forEach(el => el.textContent = "");
            let formError = document.getElementById('form-error');
            formError.textContent = "";

            // Validações de campos
            if (nomeInput.value.trim() === '' || /\d/.test(nomeInput.value)) {
                document.getElementById('nomeError').textContent = errorMessages.nome;
                valid = false;
            }

            if (sobrenomeInput.value.trim() === '' || /\d/.test(sobrenomeInput.value)) {
                document.getElementById('sobrenomeError').textContent = errorMessages.sobrenome;
                valid = false;
            }

            if (!emailInput.checkValidity()) {
                document.getElementById('emailError').textContent = errorMessages.email;
                valid = false;
            }

            const phoneValue = phoneInput.value.replace(/\D/g, '');
            if (phoneValue.length !== 11) {
                document.getElementById('telefoneError').textContent = errorMessages.telefone;
                valid = false;
            }

            if (idadeInput.value < 1 || idadeInput.value > 130) {
                document.getElementById('idadeError').textContent = errorMessages.idade;
                valid = false;
            }

            if (senhaInput.value.length < 6) {
                document.getElementById('senhaError').textContent = errorMessages.senha;
                valid = false;
            }

            if (confirmeSenhaInput.value !== senhaInput.value) {
                document.getElementById('confirmeSenhaError').textContent = errorMessages.confirmeSenha;
                valid = false;
            }

            
            if (!valid) {
                formError.textContent = "Por favor, corrija os erros acima.";
                return;
            }

            
            const user = {
                nome: nomeInput.value.trim(),
                sobrenome: sobrenomeInput.value.trim(),
                email: emailInput.value.trim(),
                telefone: phoneValue,
                idade: idadeInput.value.trim(),
                senha: senhaInput.value.trim()
            };

            console.log('Enviando dados para o servidor:', user); 

            fetch('/api/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(response => {
                console.log('Response status:', response.status); 
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data); 
                if (data.message) {
                    localStorage.setItem('form-success', data.message);
                    window.location.href = '/html/login.html';  
                } else {
                    formError.textContent = "Ocorreu um erro ao realizar o cadastro.";
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                formError.textContent = "Ocorreu um erro ao realizar o cadastro.";
            });
        });
    } else {
        console.log("Formulário não encontrado");
    }
});
