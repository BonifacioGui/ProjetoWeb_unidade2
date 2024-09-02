const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;


app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Rota para outras páginas
app.get('/servicos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'servicos.html'));
});

app.get('/agendamento', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'agendamento.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'blog.html'));
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'contato.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'cadastro.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});


app.post('/api/cadastro', (req, res) => {
    const user = req.body; 
    console.log('Dados recebidos para cadastro:', user); 
    res.json({ message: 'Cadastro realizado com sucesso!' });
});

// Rota para lidar com o login
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    console.log('Dados recebidos para login:', { email, senha }); 

    const users = [
        { email: 'guilherme@ifpe.com', senha: '123456' },
        { email: 'sergio@ifpe.com', senha: '123123' }
    ];
    const user = users.find(user => user.email === email && user.senha === senha);

    if (user) {
        res.json({ success: true, message: 'Login realizado com sucesso!' });
    } else {
        res.json({ success: false, message: 'Email ou senha incorretos.' });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
