import {Form, Button} from 'react-bootstrap'
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import { authSuccess } from '../../redux/authentication/authActions'
import {useDispatch} from "react-redux"
import React, { useEffect, useState } from "react";

const Formation = () => {
  const history = useHistory();
  const tokenCookie = Cookies.get('token')

  const CreateFormation = () =>{
      const data = { formation: {
          title: document.getElementById('title').value,
          description: document.getElementById('description').value,
        }
      };
      fetch('https://api-rails-form-you.herokuapp.com/formations', {
        method: 'post',
        headers: {
          'Authorization': `${tokenCookie}`, 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((response) => {
        history.push('/')      
      })
  
      .catch((error) => console.log(error))
    }


  return (
    <>
      <h1 className="text-center">Bienvenue sur votre page administrateur !</h1>
      <Form style={{width: "45%", marginTop: "50px", marginLeft: "30%"}} onSubmit={(e) => {
        e.preventDefault();
        CreateFormation();
      }}>
        <Form.Group controlId="formBasicEmail" >
          <h3>Creer une formation :</h3>
          <Form.Control type="text" placeholder="Titre" id="title"/>
   
        </Form.Group>
        <Form.Group controlId="formfirstname">
          <Form.Control as= "textarea" placeholder="Description" id="description"/>
      
        </Form.Group>
      
        <Button variant="primary" type="submit">
          Créer
        </Button>
      </Form>

    

    </>
  )
    

}


export default Formation