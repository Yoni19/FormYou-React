import {Form, Button} from 'react-bootstrap'
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import { authSuccess } from '../../redux/authentication/authActions'
import {useDispatch} from "react-redux"
import React, { useEffect, useState } from "react";

const Session = () => {

    const history = useHistory();
    const tokenCookie = Cookies.get('token')
    const [formations, setFormations] = useState([])
    const [rooms, setRooms] = useState([])


    const CreateSession = () =>{
        const data = { session: {
            date: document.getElementById('date').value,
            formation_id: document.getElementById('formation').value,
            room_id: document.getElementById('room').value
          }
        };
        fetch('https://api-rails-form-you.herokuapp.com/sessions', {
          method: 'post',
          headers: {
            'Authorization': `${tokenCookie}`, 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .catch((error) => console.log(error))
      }


    const fetchFormations = () => {
      fetch(`https://api-rails-form-you.herokuapp.com/formations`)
        .then((response) => response.json())
        .then((response) => {
          setFormations(response)        
        });      
    }

    
    const fetchRooms = () => {
      fetch(`https://api-rails-form-you.herokuapp.com/rooms`)
        .then((response) => response.json())
        .then((response) => {
          setRooms(response) 
          console.log(rooms)       
        });      
    }
    
    useEffect(() => {
      fetchFormations()
      fetchRooms()
    }, [])

  return (

    <Form style={{width: "45%", marginTop: "50px", marginLeft: "30%"}} onSubmit={(e) => {
      e.preventDefault();
      CreateSession()
    }}>
      <Form.Group controlId="formBasicEmail" >
        <h3>Creer une session :</h3>
        <Form.Control type="date" placeholder="date" id="date"/>

      </Form.Group>
      <Form.Group controlId="formfirstname">
        <h4>Quelle sera la formation pour cette session ?</h4>
      <Form.Control as="select" id="formation">
        {formations.map((formation) => {
            return  <option value={formation.id}>{formation.title}</option> 
        })}
      </Form.Control>
      
      </Form.Group>
      <Form.Group controlId="formfirstname">
        <h4>Dans quelle salle se déroulera cette session ?</h4>
      <Form.Control as="select" id="room">
        {rooms.map((room) => {
            return  <option value={room.id}>{room.number}</option> 
        })}
      </Form.Control>
      
      </Form.Group>

      <Button variant="primary" type="submit">
        Créer
      </Button>
    </Form>
  )
}

export default Session