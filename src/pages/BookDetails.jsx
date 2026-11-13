import { useParams } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams();

  return (
    <div className="container page-container">
      <h1>Book Details</h1>
      <p>Selected book ID: {id}</p>
    </div>
  );
}

export default BookDetails;