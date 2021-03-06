const listHelper = require("../utils/list_helper");

const listWithoutBlogs = [];
const listWithOneBlog = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }
];
const listWithMultipleBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
];

describe("total likes", () => {
  test("of an empty list", () => {
    expect(listHelper.totalLikes(listWithoutBlogs)).toBe(0);
  });
  test("of a list with a single blog", () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(7);
  });
  test("of a list with multiple blogs", () => {
    expect(listHelper.totalLikes(listWithMultipleBlogs)).toBe(38);
  });
});

describe("favorite blog", () => {
  test("of an empty list", () => {
    expect(listHelper.favoriteBlog(listWithoutBlogs)).toEqual(null);
  });
  test("of a list a single blog", () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
      id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    });
  });
  test("of a list with multiple blogs", () => {
    expect(listHelper.favoriteBlog(listWithMultipleBlogs)).toEqual({
      id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    });
  });
});

describe("author with most blogs", () => {
  test("of an empty list", () => {
    expect(listHelper.mostBlogs(listWithoutBlogs)).toEqual(null);
  });
  test("of a list with a single blog", () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
      author: "Michael Chan",
      blogs: 1
    });
  });
  test("of list with multiple blogs", () => {
    expect(listHelper.mostBlogs(listWithMultipleBlogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    });
  });
});

describe("author with most likes", () => {
  test("of an empty list", () => {
    expect(listHelper.mostLikes(listWithoutBlogs)).toEqual(null);
  });
  test("of a list with a single blog", () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
      author: "Michael Chan",
      likes: 7
    });
  });
  test("of list with multiple blogs", () => {
    expect(listHelper.mostLikes(listWithMultipleBlogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    });
  });
});