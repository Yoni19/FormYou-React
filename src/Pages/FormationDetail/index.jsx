import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom"
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'

const FormationDetail = () => {
  const { id } = useParams()
  const [formation, setFormation] = useState({})
  const [sessions, setSessions] = useState([])
  const tokenCookie = Cookies.get('token')
  const userId = useSelector(state => state.id)


  const fetchFormation = () => {
    fetch(`https://api-rails-form-you.herokuapp.com/formations/${id}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setFormation(response)        
      })
  }

  const fetchFormationSessions = () => {
    fetch(`https://api-rails-form-you.herokuapp.com/sessions?formation_id=${id}`)
      .then((response) => response.json())
      .then((response) => {
        setSessions(response)        
      })
  }

  useEffect(() => {
    fetchFormation()
    fetchFormationSessions()
  }, [])

  const sessionInscription = (sessionId) => {
      const data = { student_session:{
        user_id: userId,
        session_id: sessionId
      }}
      fetch('https://api-rails-form-you.herokuapp.com/student_sessions', {
          method: 'post',
          headers: {
            'Authorization': `${tokenCookie}`, 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      .catch((error) => alert(error))
  }

  return (
    <>
      <h1 className='my-4 ml-4'>Formation</h1>
      <h3 className='my-4 ml-4'>{formation.title}</h3>
      <p className='my-4 ml-4'>Description : {formation.description}</p>
      <h3 className='my-4 ml-4'>Sessions :</h3>
      {sessions.map((session) => {
            return  (
              <div class="media my-5 ml-4" style={{border: "solid grey 1px", width: "40%"}}>
                <div class="media-body">
                  <h5 class="mt-0 mb-1">Date : {session.date}</h5>
                  <p>Capacité : {session.capacity}</p>
                  <p>Salle : {session.room_id}</p>
                </div>
                <div class="ml-3" className="btn btn-info text-center align-self-center mr-4" onClick={() => sessionInscription(session.id)}>S'inscrire</div>
              </div>
      )})}
    </>
  )
}

export default FormationDetail;