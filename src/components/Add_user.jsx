import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
  } from "firebase/firestore";
  import React, { useEffect, useState } from "react";
  import { db } from "../firebaseConfig";
  
  function Add_user() {
    const [user, setUser] = useState({});
    const [list, setList] = useState([]);
    const [editId, setEditId] = useState("");
  
    useEffect(() => {
      getData();
    }, []);
  
    let handleChange = (e) => {
      let { name, value } = e.target;
      setUser((prev) => ({ ...prev, [name]: value }));
    };
  
    let getData = async () => {
      try {
        let res = await getDocs(collection(db, "users"));
        let allData = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setList(allData);
      } catch (error) {
        console.log(error);
      }
    };
  
    let handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (editId == "") {
          await addDoc(collection(db, "users"), user);
        } else {
          let obj = {
            username: user.username,
            password: user.password,
          };
          await updateDoc(doc(db, "users", editId), obj);
          setEditId("");
        }
      } catch (error) {
        console.log(error);
      }
      setUser({});
      getData();
    };
  
    let handleDelete = async (id) => {
      try {
        await deleteDoc(doc(db, "users", id));
        console.log(id + " Deleted");
        getData();
      } catch (error) {
        console.log(error);
      }
    };
  
    let handleEdit = (user) => {
      setUser(user);
      setEditId(user.id);
    };
  
    return (
      <>
        {/* Form for Adding and Editing User */}
        <div className="container mt-5">
          <form onSubmit={handleSubmit} className="w-75 mx-auto">
            <h3 className="text-center mb-4">{editId ? "Edit User" : "Add User"}</h3>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={user.username || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={user.password || ""}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {editId ? "Update" : "Add"} User
            </button>
          </form>
        </div>
  
        {/* Table to Display Users */}
        <div className="container mt-5">
          <h3 className="text-center mb-4">User List</h3>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning ms-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  
  export default Add_user;
  