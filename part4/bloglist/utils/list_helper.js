// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, cur) => acc + cur.likes, 0);
};

const favoriteBlog = (blogs) => {
  const result = blogs.length === 0
    ? null
    : blogs.reduce((last, curr) => curr.likes >= last.likes ? curr : last);

  return result === null ? null : {
    id: result._id,
    title: result.title,
    author: result.author,
    url: result.url,
    likes: result.likes
  };
};

module.exports = { dummy, totalLikes, favoriteBlog };