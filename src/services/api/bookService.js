import booksData from '../mockData/books.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let books = [...booksData];

const bookService = {
  async getAll() {
    await delay(300);
    return [...books];
  },

  async getById(id) {
    await delay(200);
    const book = books.find(b => b.Id === parseInt(id, 10));
    if (!book) {
      throw new Error('Book not found');
    }
    return { ...book };
  },

  async create(book) {
    await delay(250);
    const maxId = Math.max(...books.map(b => b.Id), 0);
    const newBook = {
      ...book,
      Id: maxId + 1
    };
    books.push(newBook);
    return { ...newBook };
  },

  async update(id, data) {
    await delay(250);
    const index = books.findIndex(b => b.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Book not found');
    }
    const updatedBook = { ...books[index], ...data, Id: books[index].Id };
    books[index] = updatedBook;
    return { ...updatedBook };
  },

  async delete(id) {
    await delay(200);
    const index = books.findIndex(b => b.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Book not found');
    }
    books.splice(index, 1);
    return true;
  },

  async getRandomStack(count = 10) {
    await delay(300);
    const shuffled = [...books].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  async getByGenre(genre) {
    await delay(250);
    return books.filter(book => book.genres.includes(genre));
  }
};

export default bookService;