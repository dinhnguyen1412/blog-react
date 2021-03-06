import React, { useState } from "react";

const CreateBlog = props => {
  const initialData = { id: null, title: "", content: "" };
  const [blog, setBlog] = useState(initialData);

  const onInputChange = event => {
    const { name, value } = event.target;

    setBlog({ ...blog, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!blog.title || !blog.content) {
          alert("Please fill Title and Content !");
          return;
        }
        props.createBlog(blog);
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
        <button className="primary-btn">Create</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateBlog;
