// aparecer ID e Login de todos os usuários
// Usar paginação

//chamar a API pelo axios
import React, { useState, useEffect } from "react";
import axios from "axios";
import {api} from "../Services/api"
import ListGroup from "react-bootstrap/ListGroup";
import { Table } from "react-bootstrap";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUser =  () => {
      setLoading(true);
      const response = fetch("https://api.github.com/users/" + localStorage.getItem("LOGIN"));
      setUsers([response.data]);;
      setLoading(false);
    };
    const fetchRepo = async () => {
      const res = await api.get("/users/contrastguy/repos");
      const data = res.data;
      setRepos(data);
    };

    fetchUser();
    fetchRepo();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ListGroup>
          {users.map((user) => (
            <div>
              <ListGroup.Item key={user.id}>ID: {user.id}</ListGroup.Item>
              <ListGroup.Item key={user.login}>
                Login: {user.login}
              </ListGroup.Item>
              <ListGroup.Item key={user.url}>
                Profile_url: {user.url}
              </ListGroup.Item>
              <ListGroup.Item key={user.created_at}>
                Login Creation Date: {user.created_at}
              </ListGroup.Item>
            </div>
          ))}
        </ListGroup>
      )}
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <td>
        {repos.map((user) => (
              <tr>{user.id}</tr>
            ))}
          </td>  
          <td>
          {repos.map((user) => (
              <tr>{user.name}</tr>
            ))}
          </td>
          <td>
          {repos.map((user) => (
              <tr>{user.url}</tr>
            ))}
          </td>
        </tbody>
      </Table>
    </div>
  );
};

export default UserDetails;