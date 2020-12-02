import {Form, Button} from 'react-bootstrap'
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import { authSuccess } from '../../redux/authentication/authActions'
import {useDispatch} from "react-redux"
import React, { useEffect, useState } from "react";

const Session = () => {

  const [formations, setFormation] = useState([]);
  const fetchList = () => {
    fetch("https://api-rails-form-you.herokuapp.com//formations")
      .then((response) => response.json())
      .then((response) => {
      setFormation(response)
          
        });
    };

    useEffect(() => {
      fetchList();
    }, []);
  ;

return (
<Form style={{width: "45%", marginTop: "50px", marginLeft: "30%"}} onSubmit={(e) => {
  e.preventDefault();
 ;
}}>
  <Form.Group controlId="formBasicEmail" >
    <h3>Creer une session :</h3>
    <Form.Control type="email" placeholder="Titre" id="date"/>

  </Form.Group>
  <Form.Group controlId="formfirstname">
    <h4>Quelle sera la formation pour cette session ?</h4>
  <Form.Control as="select">
  {formations.map((formation) => {
      return  <option>{formation.title}</option> 
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