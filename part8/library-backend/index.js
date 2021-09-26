const { ApolloServer, gql, UserInputError} = require("apollo-server");
// import necessary for playground in newer versions
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require("apollo-server-core");
const { v1: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const config = require("./config");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
}).then(() => {
  console.log("Connected to MongoDB")
}).catch((error) => {
  console.error(error);
});

const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        bookCount: Int!
    }
    type Book {
        title: String!
        author: Author!
        published: Int!
        genres: [String!]!
        id: ID!
    }
    type Query {
        authorCount: Int!
        bookCount: Int!
        allAuthors: [Author!]!
        allBooks(author: String, genre: String): [Book!]!
    }
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    allBooks: (root, args) => {
      let filter = {};
      if(args.author !== undefined) {
        filter.author = args.author;
      }
      if(args.genre !== undefined) {
        filter.genre = args.genre;
      }
      return Book.find(filter);
    }
  },
  Author: {
    bookCount: (root) => Book.find({ author: root.name }).countDocuments()
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });

      try {
        await book.save();
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      return book;
    },
    editAuthor: (root, args) => {
      return null;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground() // enabling playground
  ]
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});
