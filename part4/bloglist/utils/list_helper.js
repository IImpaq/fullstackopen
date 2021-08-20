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
    : blogs.reduce((last, curr) => curr.likes > last.likes ? curr : last);

  return result === null ? null : {
    id: result._id,
    title: result.title,
    author: result.author,
    url: result.url,
    likes: result.likes
  };
};

const mostBlogs = (blogs) => {
  return blogs
    .reduce((res, cur) => {
      // Checking if author was already found in res list
      let found = res.find(blog => blog.author === cur.author);
      // If the author was found already, add 1 to the authors blog count
      if(found) { found.blogs++; }
      // If found return the same list, because blog count was already updated
      // Otherwise add the newly found author to the res list.
      return found ? res : res.concat({ author: cur.author, blogs: 1 });
    }, [])
    // Return the author with the highest blog count
    .reduce((last, curr) => last.blogs > curr.blogs ? last : curr);
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };