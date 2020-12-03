import {Form, Button, Table} from 'react-bootstrap'
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
    const [sessionList, setSessionList] = useState([])


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


    const fetchSessions = () => {
      fetch('https://api-rails-form-you.herokuapp.com/sessions')
      .then((response) => response.json())
      .then((response) => {
        setSessionList(response)
      })
      .catch((error) => console.log(error))
    }

    useEffect(() => {
      fetchSessions()
    }, [])

    const handleClickDelete = (sessionId) => {
      fetch(`https://api-rails-form-you.herokuapp.com/sessions/${sessionId}`, {
        method: 'delete',
        headers: {
          'Authorization': `${tokenCookie}`, 
          'Content-Type': 'application/json'
        },
      })
      .then((response) => fetchSessions())
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
    <>
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
      <h1 className="text-center my-4">Voici la liste des utilisateurs du site </h1>
      <div className="text-center d-flex justify-content-center">
        <Table striped bordered hover size="sm" className="mx-4" style={{width: "70%"}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>date</th>
              <th>room</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody> 
            {sessionList.map((session) => {
                return  (
                  <tr>
                    <td>{session.id}</td>
                    <td>{session.date}</td>
                    <td>{session.room_id}</td>
                    <td className="text-center"><Button className="btn btn-danger" onClick={() => handleClickDelete(session.id)}>Delete</Button></td>
                  </tr>
                )
            })}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default Session