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

export const getBookDetails = async (id) => {
  const response = await fetch(`${API_URL}/works/${id}.json`);

  if (!response.ok) {
    throw new Error('Could not fetch book details.');
  }

  const data = await response.json();

  // Fetch author names
  const authors = await Promise.all(
    (data.authors || []).slice(0, 3).map(async (item) => {
      try {
        const authorResponse = await fetch(
          `${API_URL}${item.author.key}.json`
        );

        if (!authorResponse.ok) return null;

        const authorData = await authorResponse.json();
        return authorData.name;
      } catch {
        return null;
      }
    })
  );

  return {
    id: data.key.split('/').pop(),
    title: data.title,
    description:
      typeof data.description === 'string'
        ? data.description
        : data.description?.value || 'No description available.',
    subjects: data.subjects || [],
    authors: authors.filter(Boolean),
    coverId: data.covers?.find((cover) => cover > 0) || null
  };
};