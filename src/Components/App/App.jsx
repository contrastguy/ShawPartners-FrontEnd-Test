// aparecer ID e Login de todos os usuários
// Usar paginação 

//chamar a API pelo axios 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from './Services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await api.get("/users")
    ;
      setUsers(response.data);
      console.log(response.data);
      setLoading(false);
    };

    fetchUsers();
  }, [page]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              ID: {user.id} Login: {user.login}
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default UserList;
