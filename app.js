import express from 'express';
import { v4 as UUID } from 'uuid';

const app = express();

let booksStorage = [];
app.use(express.json())

app.post('/books', (request, response) => {
    const { name, year } = request.body;
    const book = {
        name,
        year,
        "id": UUID()
    };
    booksStorage.push(book)
    return response.status(200).json('Cadastrado com sucesso!');
});

app.get('/books', (request, response) => {
    response.json(booksStorage);
});

app.put('/books/:id', (request, response) => {
    const { id } = request.params;
    const { name, year } = request.body;
    const bookIndex = booksStorage.findIndex((book) => {
        return id === book.id;
    });
    booksStorage[bookIndex] = {
        ...booksStorage[bookIndex],
        name,
        year
    };

    return response.status(200).json({
        "message": "Cadastrado com sucesso!",
        "data": booksStorage
    });
});

app.delete('/books/:id', (request, response) => {
    const { id } = request.params;
    const bookIndex = booksStorage.findIndex((book) => { book.id === id });
    booksStorage.splice(-bookIndex, 1);
    return response.status(200).json('Removido com sucesso');
});
app.listen(4000, () =>
    console.log(`Server listening on port 4000!`)
);
