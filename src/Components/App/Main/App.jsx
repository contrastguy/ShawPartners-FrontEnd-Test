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
  const [error, setError] = useState(null);
  const [number, setNumber] = useState(10);
  const [offset, setOffset] = useState(0);
  const navigator = useNavigate();

  const moreUsers = () => {
    setPage(page + 1);
    setNumber((p) => p + 10);
    setOffset(o => o >= 40 ? 40 : o+10)
    // Quando clica no botão, starta o useEffect e o 15 vira o valor inicial ,porém é somado ou diminuido
  };
  const lessUsers = () => {
    setPage(page - 1);
    setNumber((p) => p - 10);
    setOffset(o => o <= 0 ? 0 : o-10)
    //page começa com 15, toda vez que atualiza ou clicka em um botao
  };

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        setLoading(true);
        //A url do back end funciona aqui
        const response = await api.get("/users");
        setUsers(response.data);
        setLoading(false);
      };

      fetchUsers()
    } catch (error) {
      setError("Something failed!");
    }
  }, []);
  const usersNumber = +localStorage.getItem('NUMBER') 
  return (
    <>
      <h1 id="title">Users List</h1>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ListGroup class="list">
            {users.map((user, index) =>
             index+1 >= offset && index+1 <= number? (
                <>
                  <div class="list-item">
                    <ListGroup.Item
                      key={user.id}
                      onClick={(e) => {
                        localStorage.setItem("LOGIN", user.login);
                        navigator(`/users/${localStorage.getItem("LOGIN")}`);
                      }}
                    >
                     Number {index+1} ID: {user.id} / Login: {user.login}
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
            // O evento chama uma função que foi criada
            onClick={() => {
              lessUsers();
            }}
            disabled={page === 1}
          >
            Previous
          </Pagination.Item>
          <Pagination.Item
            onClick={() => {
              moreUsers();
            }}
          >
            Next
          </Pagination.Item>
        </div>

      </div>
    </>
  );
};

export default UserList;
