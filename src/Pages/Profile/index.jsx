import React, {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import { useSelector } from "react-redux";
import {Form, Button} from 'react-bootstrap'

const Profile = () => {
const userId = useSelector(state => state.id)
console.log(userId)
const [email, setEmail] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [id, setId] = useState(userId);
const [sessions, setSessions] = useState([]);

const loadInformations = (data) => {
  setEmail(data.email);
  setFirstName(data.firstname);
  setLastName(data.lastname);
}

const getInformations = () => {
  fetch(`https://api-rails-form-you.herokuapp.com/users/${id}`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`, 
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((data) => loadInformations(data.data.attributes))
}

 useEffect(() => {
   getInformations();
 }, [])

// const loadSessions = () => {
//   fetch(`https://api-rails-form-you.herokuapp.com/sessions?user.id=${id}`, {
//     method: 'get',
//     headers: {
//       'Authorization': `Bearer ${Cookies.get('token')}`, 
//       'Content-Type': 'application/json'
//     }
//     })
//      .then((response) => response.json())
//      .then((data) => setSessions(data))
//      .catch((error) => console.error(error))
//   }



  const editProfile = () => {
    const data = {
      email: document.getElementById('email').value,
      firstname: document.getElementById('firstname').value,
      lastname: document.getElementById('lastname').value,
    };

    if(data.email === ''){
      data.email = email;
    }
    if(data.firstname === ''){
      data.firstname = firstName;
    }
    if(data.lastname === ''){
      data.lastname = lastName;
    }
    
    fetch(`https://api-rails-form-you.herokuapp.com/users/${id}`, {
    method: 'put',
    headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`, 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => loadInformations(data.data.attributes))
  .catch((error) => console.log(error))
  }

  return (
    <section>
      <h1>Bienvenue sur votre profil {id} !</h1>
      <p>email : {email}</p>
      <p>firstname : {firstName}</p>
      <p>lastname : {lastName}</p>


  <Form style={{width: "45%", marginTop: "50px"}} onSubmit={() => editProfile()}>
        <Form.Group controlId="formBasicEmail" >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" id="email"/>
        </Form.Group>
        <Form.Group controlId="formfirstname">
          <Form.Control placeholder="Enter firstname" id="firstname"/>
        </Form.Group>
        <Form.Group controlId="formlastname">
          <Form.Control placeholder="Enter lastname" id="lastname"/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </section>
  )
};

export default Profile;