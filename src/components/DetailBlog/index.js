import React, { useState, useEffect } from "react";

const UpdateBlog = props => {
  const [blog, setBlog] = useState(props.currentBlog);

  const onInputChange = event => {
    const { name, value } = event.target;

    setBlog({ ...blog, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setBlog(props.currentBlog);
  }, [props]);

  return (
    <div>
        <h1>{blog.title}</h1>
        <p>{blog.content}</p>
    </div>
)
};

export default UpdateBlog;
