
import { useState } from 'react';

import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Alert
} from 'react-bootstrap';

import { searchBooks } from '../services/openlibrary';
import BookCard from '../components/BookCard';

function Search() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setHasSearched(true);
    setBooks([]);

    try {
      const results = await searchBooks(query, searchType);
      setBooks(results);
    } catch (err) {
      setError('Could not load books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="page-container">

      {/* Page heading */}
      <div className="search-heading">
        <h1>This cat has read dozens of books 😼</h1>
        <p>
          Unlimited books to be discovered.
        </p>
      </div>

      {/* Search form */}
      <Form onSubmit={handleSearch} className="search-form">
        <Row className="g-2">

          <Col xs={12} md={3}>
            <Form.Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="title">Book title</option>
              <option value="author">Author</option>
            </Form.Select>
          </Col>

          <Col xs={12} md={7}>
            <Form.Control
              type="text"
              placeholder="Search for books or authors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>

          <Col xs={12} md={2}>
            <Button
              type="submit"
              variant="success"
              className="w-100"
              disabled={loading || !query.trim()}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </Col>

        </Row>
      </Form>

      {/* Loading indicator */}
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="success" />
          <p className="mt-2">Finding books...</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}

      {/* Search results */}
      {!loading && !error && books.length > 0 && (
        <>
          <h2 className="results-heading">
            Search results ({books.length})
          </h2>

          <Row className="g-4">
            {books.map((book) => (
              <Col
                key={book.key}
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* No results */}
      {!loading && !error && hasSearched && books.length === 0 && (
        <div className="text-center my-5">
          <h4>No books found</h4>
          <p>Try another search term.</p>
        </div>
      )}

      {/* Initial message */}
      {!hasSearched && (
        <div className="search-placeholder text-center">
          <h3>What would you like to read? 😺</h3>
          <p>Search books using Open Library.</p>
        </div>
      )}

    </Container>
  );
}

export default Search;
