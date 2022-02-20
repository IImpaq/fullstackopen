const Author = require("./models/author");
const Book = require("./models/book");
const {AuthenticationError, UserInputError} = require("apollo-server");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const config = require("./config");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: () => Author.find({}).populate("books"),
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
    bookCount: (root) => root.books.length
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
        foundAuthor.books = foundAuthor.books.concat(newBook._id);
        await foundAuthor.save();
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    }
  }
};

module.exports = resolvers;