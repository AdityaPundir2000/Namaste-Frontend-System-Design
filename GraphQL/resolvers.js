export const data = {
  authors: [
    {
      id: "1",
      name: "Aditya",
      bookIDs: ["101"],
    },
    {
      id: "2",
      name: "Akshay Saini",
      bookIDs: ["102", "103"],
    },
  ],
  books: [
    {
      id: "101",
      title: "Namaste Frontend System Design",
      publishedYear: 2024,
      authorID: "1",
    },
    {
      id: "102",
      title: "Namaste React",
      publishedYear: 2023,
      authorID: "2",
    },
    {
      id: "103",
      title: "Namaste JavaScript",
      publishedYear: 2022,
      authorID: "2",
    },
  ],
};

export const resolvers = {
  Author: {
    books: (parent) => {
      return data.books.filter((book) => parent.bookIDs.includes(book.id));
    },
  },

  Book: {
    author: (parent) => {
      return data.authors.find((author) => author.id === parent.authorID);
    },
  },

  Query: {
    authors: () => data.authors,
    books: () => data.books,
  },

  Mutation: {
    addBook: (parent, args) => {
      const { title, publishedYear, authorID } = args;

      const author = data.authors.find((a) => a.id === authorID);
      if (!author) {
        throw new Error("Author not found");
      }

      const newBook = {
        id: String(data.books.length + 101),
        title,
        publishedYear,
        authorID,
      };

      data.books.push(newBook);
      author.bookIDs.push(newBook.id);

      return newBook;
    },
  },
};