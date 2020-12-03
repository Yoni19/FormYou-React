import {Form, Button, Table} from 'react-bootstrap'
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import { authSuccess } from '../../redux/authentication/authActions'
import {useDispatch} from "react-redux"
import React, { useEffect, useState } from "react";

const Formation = () => {
  const history = useHistory();
  const tokenCookie = Cookies.get('token')
  const [formationList, setFormationList] = useState([])

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

    const fetchFormations = () => {
      fetch('https://api-rails-form-you.herokuapp.com/formations')
      .then((response) => response.json())
      .then((response) => {
        setFormationList(response)
      })
      .catch((error) => console.log(error))
    }

    useEffect(() => {
      fetchFormations()
      console.log(formationList)
    }, [])

    const handleClickDelete = (formationId) => {
      fetch(`https://api-rails-form-you.herokuapp.com/formations/${formationId}`, {
        method: 'delete',
        headers: {
          'Authorization': `${tokenCookie}`, 
          'Content-Type': 'application/json'
        },
      })
      .then((response) => fetchFormations())
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
        <h1 className="text-center my-4">Voici la liste des utilisateurs du site </h1>
        <Table striped bordered hover size="sm">
          
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody> 
            {formationList.map((formation) => {
                return  (
                  <tr>
                    <td>{formation.id}</td>
                    <td>{formation.title}</td>
                    <td className="text-center"><Button className="btn btn-danger" onClick={() => handleClickDelete(formation.id)}>Delete</Button></td>
                  </tr>
                )
            })}
          </tbody>


          </Table>
      </Form>

    

    </>
  )
    

}


export default Formation