import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getBlogs,
  getCreatedBlog,
  getUpdatedBlog
} from "./app/api";

// Styles
import "./app.scss";

// Components
import DataTable from "./components/DataTable";
import CreateBlog from "./components/CreateBlog";
import UpdateBlog from "./components/UpdateBlog";
import Modal from "./components/Modal";
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import MySwal from "./index";

function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const [loading, setLoading] = useState(false);

  const [currentBlog, setCurrentBlog] = useState({
    id: null,
    image: null,
    title: "",
    content: ""
  });
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedUsers, setSavedUsers] = useState(users);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const usersLastIndex = currentPage * pageSize;
  const usersFirstIndex = usersLastIndex - pageSize;
  const currentUsers = users.slice(usersFirstIndex, usersLastIndex);

  // Setting up Modal
  const setModal = modal => {
    search("");
    setActiveModal({ name: modal, active: true });
  };

  // Pagination
  const paginate = page => {
    setCurrentPage(page);
  };

  // Search
  const search = term => {
    if (term.length > 2) {
      setCurrentPage(1);

      const results = savedUsers.filter(user =>
        Object.keys(user).some(key =>
          user[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      dispatch({ type: "SET_USERS", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_USERS", data: savedUsers });
    }
  };

  // Sorting
  const sorting = key => {
    setSorted(!sorted);
    switch (key) {
      case "id":
        const nameSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.id.localeCompare(b.id, "tr")
            : b.id.localeCompare(a.id, "tr");
        });
        dispatch({ type: "SET_USERS", data: nameSort });
        return;
      case "title":
        const surnameSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.title.localeCompare(b.title, "tr")
            : b.title.localeCompare(a.title, "tr");
        });
        dispatch({ type: "SET_USERS", data: surnameSort });
        return;
      default:
        break;
    }
  };

  // Create Blog
  const createBlog = async user => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatedBlog(user).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Blog created successfully."
        }).then(() => {
          dispatch({ type: "CREATE_USER", data: result });
          setSavedUsers([...users, result]);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create blog."
      });
    } finally {
      setLoading(false);
    }
  };

  // Update User
  const updateRow = blog => {
    setModal("Update Blog");

    setCurrentBlog({
      id: blog.id,
      image: blog.image.url,
      title: blog.title,
      content: blog.content,
    });
  };

  const updateBlog = async (id, updatedBlog) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedBlog(id, updatedBlog).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Blog updated successfully."
        }).then(() => {
          dispatch({
            type: "SET_USERS",
            data: users.map(user =>
              user.id === id ? Object.assign(user, result) : user
            )
          });
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update blog."
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Blogs
  const fetchBlogs = async () => {
    setLoading(true);

    try {
      await getBlogs().then(({ data }) => {
        setSavedUsers(data.data);
        dispatch({ type: "SET_USERS", data: data.data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch blogs."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="app">
      {/* <Header /> */}
      <main className="content">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <div className="content-wrapper">
              <div className="toolbar">
                <Search search={search} resetSearch={search} />
                <button
                  className="primary-btn"
                  onClick={() => setModal("Create Blog")}
                >
                  Create New Blog
                </button>
              </div>
              <DataTable
                users={currentUsers}
                updateRow={updateRow}
                onSortChange={sorting}
              />
              <Pagination
                totalResults={users.length}
                currentPage={currentPage}
                pageSize={pageSize}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      </main>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
          {activeModal.name === "Create Blog" && (
            <CreateBlog
              createBlog={createBlog}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update Blog" && (
            <UpdateBlog
              currentBlog={currentBlog}
              updateBlog={updateBlog}
              setActiveModal={setActiveModal}
            />
          )}
          
        </Modal>
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
