const DataLoader = require("dataloader");
const { Book } = require("../../models/associations");

const getBookLoader = () => {
  return new DataLoader(async (authorIds) => {
    console.log(`Batch loading books for author IDs: ${authorIds}`);

    // Fetch books for all author IDs in a single query
    const books = await Book.findAll({
      where: {
        author_id: authorIds,
      },
    });

    // Group books by author_id
    const booksByAuthorId = authorIds.map((authorId) =>
      books.filter((book) => book.author_id === authorId)
    );

    return booksByAuthorId;
  });
};

module.exports = getBookLoader;
