import React, { useState } from "react";

const CreateBlog = props => {
  const initialData = { id: null, title: "", content: "" };
  const [user, setUser] = useState(initialData);

  const onInputChange = event => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!user.title || !user.content) return;
        props.createBlog(user);
      }}
    >
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={user.title}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Content</label>
        <input
          type="text"
          name="content"
          value={user.content}
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
