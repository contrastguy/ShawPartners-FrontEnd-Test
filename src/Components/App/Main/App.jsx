// aparecer ID e Login de todos os usuários
// Usar paginação

//chamar a API pelo axios
import React, { useState, useEffect } from "react";
import { api } from "../Services/api";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "react-bootstrap/Pagination";
import { Navigate, useNavigate } from "react-router-dom";

import "./CSS/styles.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(1);
  const navigator = useNavigate();
  const moreUsers = () => {
    setPage(page + 1);
    localStorage.setItem("NUMBER", (number + 5));
  };
  const lessUsers = () => {
    setPage(page - 1);
    localStorage.setItem("NUMBER", (number - 5));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      //A url do back end funciona aqui
      const response = await api.get("/users");
      setUsers(response.data);
      setLoading(false);
    };
    

    fetchUsers();
    setNumber(15);
    localStorage.setItem("NUMBER", number);
  }, [number]);

  return (
    <>
      <h1 id="title">Users List</h1>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ListGroup class="list">
            {users.map((user, index) =>
              index <= (localStorage.getItem("NUMBER")) ? (
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
              ) : null
            )}
          </ListGroup>
        )}
        <div class="pagination">
          <Pagination.Item
            //Quando eu clico no botão , volta a lista com os mesmos usuários
            onClick={() => {lessUsers()}}
            disabled={page === 1}
          >
            Previous
          </Pagination.Item>
          <Pagination.Item onClick={() => {moreUsers()}}>Next</Pagination.Item>
        </div>
      </div>
    </>
  );
};

export default UserList;
