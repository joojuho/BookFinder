const STORAGE_KEY = 'bookfinder-reading-list';

// Get all saved books
export const getSavedBooks = () => {
  const savedBooks = localStorage.getItem(STORAGE_KEY);

  return savedBooks ? JSON.parse(savedBooks) : [];
};

// Save a new book
export const addBook = (book) => {
  const savedBooks = getSavedBooks();

  const alreadyExists = savedBooks.some(
    (savedBook) => savedBook.id === book.id
  );

  if (alreadyExists) {
    return false;
  }

  const updatedBooks = [
    ...savedBooks,
    {
      ...book,
      status: 'want-to-read'
    }
  ];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedBooks)
  );

  return true;
};

// Remove a book
export const removeBook = (id) => {
  const savedBooks = getSavedBooks();

  const updatedBooks = savedBooks.filter(
    (book) => book.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedBooks)
  );
};

// Update reading status
export const updateBookStatus = (id, status) => {
  const savedBooks = getSavedBooks();

  const updatedBooks = savedBooks.map((book) =>
    book.id === id ? { ...book, status } : book
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedBooks)
  );
};