import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  Badge
} from 'react-bootstrap';

import toast from 'react-hot-toast';

import { getBookDetails } from '../services/openlibrary';
import { addBook, getSavedBooks } from '../services/readingList';

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getBookDetails(id);
        setBook(data);

        const savedBooks = getSavedBooks();

        setIsSaved(
          savedBooks.some((savedBook) => savedBook.id === id)
        );
      } catch (err) {
        setError('Could not load this book. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleAddBook = () => {
    const result = addBook(book);

    if (result) {
      setIsSaved(true);
      toast.success('Book added to your reading list!');
    } else {
      toast('This book is already in your list.');
    }
  };

  if (loading) {
    return (
      <Container className="page-container text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading book details...</p>
      </Container>
    );
  }

  if (error || !book) {
    return (
      <Container className="page-container">
        <Alert variant="danger">
          {error || 'Book not found.'}
        </Alert>

        <Link to="/" className="btn btn-success">
          Back to search
        </Link>
      </Container>
    );
  }

  const coverUrl = book.coverId
    ? `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
    : null;

  return (
    <Container className="page-container">

      <Link to="/" className="back-link">
        ← Back to search
      </Link>

      <Row className="mt-4 g-5">

        {/* Book cover */}
        <Col md={4}>
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={book.title}
              className="details-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="details-no-cover">
              No cover available
            </div>
          )}
        </Col>

        {/* Book information */}
        <Col md={8}>
          <div className="book-details-info">

            <h1>{book.title}</h1>

            <p className="details-author">
              {book.authors.length > 0
                ? book.authors.join(', ')
                : 'Unknown author'}
            </p>

            <hr />

            <h4>About this book</h4>

            <p className="details-description">
              {book.description}
            </p>

            <h4 className="mt-4">Subjects</h4>

            <div className="subjects-list">
              {book.subjects.slice(0, 10).map((subject) => (
                <Badge
                  bg="light"
                  text="dark"
                  className="subject-badge"
                  key={subject}
                >
                  {subject}
                </Badge>
              ))}

              {book.subjects.length === 0 && (
                <p>No subjects available.</p>
              )}
            </div>

            <Button
              variant="success"
              className="mt-4 add-book-button"
              onClick={handleAddBook}
              disabled={isSaved}
            >
              {isSaved ? '✓ Added to My List' : '+ Add to My List'}
            </Button>

          </div>
        </Col>

      </Row>
    </Container>
  );
}

export default BookDetails;