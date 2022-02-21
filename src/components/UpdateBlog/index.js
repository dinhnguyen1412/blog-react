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
    <form
      onSubmit={event => {
        event.preventDefault();
        props.updateBlog(blog.id, blog);
      }}
    >
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Content</label>
        <input
          type="text"
          name="content"
          value={blog.content}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Update</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateBlog;
