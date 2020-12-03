import React, {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import { useSelector } from "react-redux";
import {Form, Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

const Profile = () => {
  const history = useHistory();
  const userId = useSelector(state => state.id)
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
    if (userId){
    getInformations();
    loadSessions()
    } else {
      alert('You need to login again')
      history.push('/')
    }
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
              <div class="media my-5 ml-4" style={{border: "solid grey 1px", width: "40%"}}>
                <div class="media-body">
                  <h5 class="mt-0 mb-1">Date : {session.date}</h5>
                  <p>Capacité : {session.capacity}</p>
                  <p>Salle : {session.room_id}</p>
                </div>
              </div>    
          )})
        }
      </div>
    </>
  )
};

export default Profile;