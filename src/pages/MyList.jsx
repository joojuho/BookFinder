import { useState, useEffect } from 'react';
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import toast from 'react-hot-toast';

import {
    getSavedBooks,
    removeBook,
    updateBookStatus
} from '../services/readingList';

function MyList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        setBooks(getSavedBooks());
    }, []);

    const handleStatusChange = (id, status) => {
        updateBookStatus(id, status);

        setBooks(currentBooks =>
            currentBooks.map(book =>
                book.id === id ? { ...book, status } : book
            )
        );

        toast.success('Reading status updated!');
    };

    const handleRemove = (id) => {
        removeBook(id);
        setBooks(currentBooks =>
            currentBooks.filter(book => book.id !== id)
        );

        toast.success('Book removed!');
    };

    return (
        <Container className="page-container">
            <h1>My Reading List</h1>
            <p>Books you've saved.</p>

            {books.length === 0 ? (
                <p>Your reading list is empty. Search for books to add!</p>
            ) : (
                <Row className="g-3">
                    {books.map(book => (
                        <Col xs={12} key={book.id}>
                            <Card>
                                <Card.Body>
                                    {book.coverId && (
                                        <img
                                            src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                                            alt={`Cover of ${book.title}`}
                                            style={{
                                                width: '100px',
                                                height: '150px',
                                                objectFit: 'contain',
                                                marginBottom: '10px'
                                            }}
                                        />
                                    )}

                                    <Card.Title>{book.title}</Card.Title>

                                    <Card.Text>
                                        {book.authors?.join(', ') || 'Unknown author'}
                                    </Card.Text>

                                    <Form.Select
                                        value={book.status || 'want-to-read'}
                                        onChange={e =>
                                            handleStatusChange(book.id, e.target.value)
                                        }
                                        className="mb-3"
                                    >
                                        <option value="want-to-read">Want to read</option>
                                        <option value="reading">Currently reading</option>
                                        <option value="done">Finished</option>
                                    </Form.Select>

                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleRemove(book.id)}
                                    >
                                        Remove
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default MyList;