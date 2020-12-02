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
  const [sessions, setSessions] = useState([])

  const loadInformations = (data) => {
    setEmail(data.email);
    setFirstName(data.firstname);
    setLastName(data.lastname);
  }

  const getInformations = () => {
    fetch(`https://api-rails-form-you.herokuapp.com/users/${userId}`, {
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
    loadSessions()
  }, [])

  const loadSessions = () => {
    fetch(`https://api-rails-form-you.herokuapp.com/sessions?user_id=${userId}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`, 
        'Content-Type': 'application/json'
      }
      })
      .then((response) => response.json())
      .then((data) => setSessions(data))
      .catch((error) => console.error(error))
  }


  return (
    <>
      <section>
        <h1>Bienvenue sur votre profil {userId} !</h1>
        <p>email : {email}</p>
        <p>firstname : {firstName}</p>
        <p>lastname : {lastName}</p>
      </section>
      <div id="sessions">
        {sessions.map((session) => {
          return (
            session.date
          )})
          }
      </div>
    </>
  )
};

export default Profile;