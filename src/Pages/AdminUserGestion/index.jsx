import {Form, Button,Table} from 'react-bootstrap'
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import { authSuccess } from '../../redux/authentication/authActions'
import {useDispatch} from "react-redux"
import React, { useEffect, useState } from "react";

const Session = () => {
  const [userslist, setUsersList] = useState([]);
  const tokenCookie = Cookies.get('token')
  const fetchingUsers = () =>{


      fetch("https://api-rails-form-you.herokuapp.com//users")
        .then((response) => response.json())
        .then((response) => {
        setUsersList(response)
        });
  };

  useEffect(() => {
    fetchingUsers();
  }, []);
    
  const handleClickDelete = (id) => {
      fetch(`https://api-rails-form-you.herokuapp.com/users/${id}`, {
        method: 'delete',
        headers: {
          'Authorization': `${tokenCookie}`, 
          'Content-Type': 'application/json'
        },
      })
      .then((response) => fetchingUsers())
      .catch((error) => console.log(error))
  }

  return (
    <div>
    <h1 className="text-center">Voici la liste des utilisateurs du site </h1>
    <Table striped bordered hover size="sm">
      
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Status</th>
          <th>Validated</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody> 
        {userslist.map((user) => {
            return  (
              <tr>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.status}</td>
                <td>{user.validated === true? "True":"False"}</td>
                <td><Button className="btn btn-danger" onClick={() => handleClickDelete(user.id)}>Delete</Button></td>
              </tr>
            )
        })}
      </tbody>


      </Table>
    </div>
  )
}

export default Session