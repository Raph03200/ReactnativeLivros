const API_URL = 'http://localhost:3000/api/livro';

document.getElementById('livroForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const anoLancamento = document.getElementById('anoLancamento').value;
    const genero = document.getElementById('genero').value;
    const imagem = document.getElementById('imagem').value;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, autor, anoLancamento, genero, imagem })
    });

    const livro = await response.json();
    appendLivro(livro);

    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('anoLancamento').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('imagem').value = '';
});

async function loadLivros() {
    const response = await fetch(API_URL);
    const livros = await response.json();
    livros.forEach(appendLivro);
}

async function deleteLivro(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    document.location.reload();
}

loadLivros();