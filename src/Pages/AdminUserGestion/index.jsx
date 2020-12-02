import {Form, Button,Table} from 'react-bootstrap'
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import { authSuccess } from '../../redux/authentication/authActions'
import {useDispatch} from "react-redux"
import React, { useEffect, useState } from "react";

const Session = () => {
  const [userslist, setUsersList] = useState([]);
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
  ;
console.log('la liste !:',userslist)

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
      <th>validated</th>
    </tr>
  </thead>
  <tbody>
 
  {userslist.map((usersList) => {
      return  (
  <tr>
      <td>{usersList.id}</td>
      <td>{usersList.email}</td>
      <td>{usersList.firstname}</td>
      <td>{usersList.lastname}</td>
      <td>{usersList.status}</td>
      <td>{usersList.validated === true? "True":"False"}</td>
    </tr>)
     })}
   
    </tbody>


    </Table>
</div>
)
}

export default Session