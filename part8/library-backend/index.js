const { ApolloServer, gql, UserInputError, AuthenticationError} = require("apollo-server");
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
const User = require("./models/user");

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
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
    type Token {
        value: String!
    }
    type Query {
        authorCount: Int!
        bookCount: Int!
        allAuthors: [Author!]!
        allBooks(author: String, genre: String): [Book!]!
        me: User
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
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    allBooks: async (root, args) => {
      if(args.genre !== undefined) {
        return Book.find({ genres: { $in: args.genre } }).populate("author");
      }
      return Book.find({}).populate("author");
    },
    me: (root, args, context) => {
      return context.currentUser;
    }
  },
  Author: {
    bookCount: (root) => Book.find({ author: { $in : root } }).countDocuments()
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if(!currentUser) {
        throw new AuthenticationError("User not authenticated");
      }

      const foundBook = await Book.findOne({ title: args.title });

      if(foundBook) {
        throw new UserInputError("Book already exists", {
          invalidArgs: args.title
        });
      }

      if(args.title.length < 2) {
        throw new UserInputError("Book title too short (minLength: 2)", {
          invalidArgs: args.title
        });
      }

      if(args.author.length < 4) {
        throw new UserInputError("Author name too short (minLength: 4)", {
          invalidArgs: args.author
        });
      }

      let foundAuthor = await Author.findOne({ name: args.author });

      if(!foundAuthor) {
        const newAuthor = new Author({ name: args.author });
        try {
          await newAuthor.save();
        } catch(error) {
          throw new UserInputError((error.message), {
            invalidArgs: args
          });
        }
        foundAuthor = await Author.findOne({ name: args.author });
      }

      const newBook = new Book({ ...args, author: foundAuthor });

      try {
        await newBook.save();
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      return newBook;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if(!currentUser) {
        throw new AuthenticationError("User not authenticated");
      }

      const foundAuthor = await Author.findOne({ name: args.name });

      if(!foundAuthor) {
        throw new UserInputError("Author does not exist", {
          invalidArgs: args.name
        });
      }

      if(args.setBornTo < 0) {
        throw new UserInputError("Invalid birthyear number", {
          invalidArgs: args.setBornTo
        });
      }

      const filter = { name: args.name };
      const update = { born: args.setBornTo };
      const options = { new: true, runValidators: true };
      return Author.findOneAndUpdate(filter, update, options);
    },
    createUser: async (root, args) => {
      const foundUser = await User.findOne({ username: args.username });

      if(foundUser) {
        throw new UserInputError("User already exists", {
          invalidArgs: args.username
        });
      }

      const newUser = new User({ ...args });

      return newUser.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if(!user || args.password !== "secret") {
        throw new UserInputError("Wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, config.SECRET) };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if(auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground() // enabling playground
  ]
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});
