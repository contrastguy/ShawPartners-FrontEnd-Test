// aparecer ID e Login de todos os usuários
// Usar paginação

//chamar a API pelo axios
import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../Services/api";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "react-bootstrap/Pagination";
import UserDetails from "../Details/details";
import { Navigate, useNavigate } from "react-router-dom";

import "./CSS/styles.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await api.get("/users");
      setUsers(response.data);
      console.log(response.data);
      setLoading(false);
    };
    fetchUsers();
  }, [page]);

  return (
    <>
      <h1 id="title">Users List</h1>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ListGroup class="list">
            {users.map((user) => (
              <>
                <div class="list-item">
                  <ListGroup.Item
                    key={user.id}
                    onClick={(e) => {
                      localStorage.setItem("LOGIN", user.login);
                      navigator(`/users/${localStorage.getItem("LOGIN")}`);
                    }}
                  >
                    ID: {user.id} / Login: {user.login}
                  </ListGroup.Item>
                </div>
              </>
            ))}
          </ListGroup>
        )}
        <div class="pagination">
          <Pagination.Item
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Pagination.Item>
          <Pagination.Item onClick={() => setPage(page + 1)}>
            Next
          </Pagination.Item>
        </div>
      </div>
    </>
  );
};

export default UserList;
