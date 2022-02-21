import axios from "axios";

function getBlogs() {
  const response = axios.get(`https://api-placeholder.herokuapp.com/api/v1/blogs`);

  return response;
}

function getCreatedBlog({ title, content }) {
  const response = axios.post(`https://api-placeholder.herokuapp.com/api/v1/blogs`, {
    title,
    content
  });

  return response;
}

function getUpdatedBlog(id, blog) {
  const response = axios.put(`https://api-placeholder.herokuapp.com/api/v1/blogs/${id}`, {
    image: blog.avatar,
    id: id,
    title: blog.title,
    content: blog.content
  });

  return response;
}
function getDeatilBlog(id) {
  const response = axios.get(`https://api-placeholder.herokuapp.com/api/v1/blogs/${id}`);

  return response;
}

export { getBlogs, getCreatedBlog, getUpdatedBlog, getDeatilBlog};
