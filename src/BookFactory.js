export const create = (book={}, showOnSearch=false) => (
  {
    id: book.id || '',
    title: book.title || '',
    imageUrl: book.imageLinks.thumbnail || '',
    authors: book.authors || [],
    shelf: book.shelf || 'none',
    pageCount: book.pageCount || '',
    description: book.description || '',
    showOnSearch: showOnSearch
  }
)