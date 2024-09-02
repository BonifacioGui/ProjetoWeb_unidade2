document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('telefone');

    phoneInput.addEventListener('input', function(event) {
        let value = phoneInput.value;
        value = value.replace(/\D/g, ''); 

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
            event.preventDefault(); // Impede o envio do formulário para fins de teste
            
            let valid = true;
            const errorMessages = {
                nome: "Este campo é obrigatório e não pode conter números.",
                sobrenome: "Este campo é obrigatório e não pode conter números.",
                email: "Digite um email válido.",
                telefone: "Digite um número de telefone válido no formato (99) 99999-9999.",
                idade: "Digite uma idade válida",
                senha: "A senha deve ter pelo menos 6 caracteres.",
                confirmeSenha: "As senhas devem ser iguais."
            };

            const nomeInput = document.getElementById('nome');
            const sobrenomeInput = document.getElementById('sobrenome');
            const idadeInput = document.getElementById('idade');
            const senhaInput = document.getElementById('senha');
            const confirmeSenhaInput = document.getElementById('confirme-senha');

            let formError = document.getElementById('form-error');
            formError.textContent = "";

            // Valida cada campo
            if (nomeInput.value.trim() === '' || /\d/.test(nomeInput.value)) {
                document.getElementById('nomeError').textContent = errorMessages.nome;
                valid = false;
            } else {
                document.getElementById('nomeError').textContent = "";
            }

            if (sobrenomeInput.value.trim() === '' || /\d/.test(sobrenomeInput.value)) {
                document.getElementById('sobrenomeError').textContent = errorMessages.sobrenome;
                valid = false;
            } else {
                document.getElementById('sobrenomeError').textContent = "";
            }

            if (!document.getElementById('email').checkValidity()) {
                document.getElementById('emailError').textContent = errorMessages.email;
                valid = false;
            } else {
                document.getElementById('emailError').textContent = "";
            }

            const phoneValue = phoneInput.value.replace(/\D/g, '');
            if (phoneValue.length !== 11) {
                document.getElementById('telefoneError').textContent = errorMessages.telefone;
                valid = false;
            } else {
                document.getElementById('telefoneError').textContent = "";
            }

            if (idadeInput.value < 1 || idadeInput.value > 130) {
                document.getElementById('idadeError').textContent = errorMessages.idade;
                valid = false;
            } else {
                document.getElementById('idadeError').textContent = "";
            }

            if (senhaInput.value.length < 6) {
                document.getElementById('senhaError').textContent = errorMessages.senha;
                valid = false;
            } else {
                document.getElementById('senhaError').textContent = "";
            }

            if (confirmeSenhaInput.value !== senhaInput.value) {
                document.getElementById('confirmeSenhaError').textContent = errorMessages.confirmeSenha;
                valid = false;
            } else {
                document.getElementById('confirmeSenhaError').textContent = "";
            }

            if (!valid) {
                formError.textContent = "Por favor, corrija os erros acima.";
            } else {
                const user = {
                    nome: nomeInput.value.trim(),
                    sobrenome: sobrenomeInput.value.trim(),
                    email: document.getElementById('email').value.trim(),
                    telefone: phoneValue,
                    idade: idadeInput.value.trim(),
                    senha: senhaInput.value.trim()
                };

                let users = JSON.parse(localStorage.getItem('users')) || [];
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                localStorage.setItem('form-success', "Cadastro realizado com sucesso!");
                
                window.location.href = '/html/login.html';
            }
        });
    } else {
        console.log("Formulário não encontrado");
    }
});
