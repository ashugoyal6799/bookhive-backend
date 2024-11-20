const DataLoader = require("dataloader");
const { Author } = require("../../models/associations");

const getAuthorLoader = () => {
  return new DataLoader(async (authorIds) => {
    console.log(`Batch loading authors for IDs: ${authorIds}`);
    const authors = await Author.findAll({
      where: { id: authorIds },
    });
    const authorMap = authors.reduce((acc, author) => {
      acc[author.id] = author;
      return acc;
    }, {});
    return authorIds.map((id) => authorMap[id] || null);
  });
};

module.exports = getAuthorLoader;
