import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function BookCard({ book }) {
  const bookId = book.key.split('/').pop();

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <Card className="book-card h-100">
      {coverUrl ? (
        <Card.Img
          variant="top"
          src={coverUrl}
          alt={book.title}
          className="book-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <div className="no-cover">
          <span>No cover available</span>
        </div>
      )}

      <Card.Body className="d-flex flex-column">
        <Card.Title>{book.title}</Card.Title>

        <Card.Text className="book-author">
          {book.author_name?.[0] || 'Unknown author'}
        </Card.Text>

        <Card.Text className="book-year">
          {book.first_publish_year || 'Publication year unknown'}
        </Card.Text>

        <Link
          to={`/book/${bookId}`}
          className="btn btn-success mt-auto"
        >
          View details
        </Link>
      </Card.Body>
    </Card>
  );
}

export default BookCard;