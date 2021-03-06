import React from "react";

// Styles
import "./style.scss";

// Images
import PlaceholderImg from "../../img/placeholder-user.jpg";
import SortIcon from "../../img/sort-icon.png";

const DataTable = props => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th></th>
            <th
              onClick={() => {
                props.onSortChange("id");
              }}
            >
              <span className="column-sort">
                ID
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("title");
              }}
            >
              <span className="column-sort">
                Title
                <img src={SortIcon} alt="Title" />
              </span>
            </th>
            <th
              // onClick={() => {
              //   props.onSortChange("email");
              // }}
            >
              <span className="column-sort">
                Content
              </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length ? (
            props.users.map(blog => (
              <tr key={blog.id} class="list-unstyled">
                <td className="field-avatar media">
                  <img
                    src={blog.image.url ? blog.image.url : PlaceholderImg}
                    alt={blog.id}
                  />
                </td>
                <td class="media">{blog.id}</td>
                <td class="media">{blog.title}</td>
                <td class="media">{blog.content}</td>
                <td className="field-actions media">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(blog);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="info-btn"
                    onClick={() => props.detailRow(blog)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <div className="no-record-message">No Record!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
