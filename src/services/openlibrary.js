const API_URL = 'https://openlibrary.org';

export const searchBooks = async (query, searchType) => {
  const params = new URLSearchParams();

  params.append(searchType, query);
  params.append(
    'fields',
    'key,title,author_name,first_publish_year,cover_i'
  );
  params.append('limit', '20');

  const response = await fetch(
    `${API_URL}/search.json?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error('Error in fetching books from Open Library API');
  }

  const data = await response.json();

  return data.docs;
};