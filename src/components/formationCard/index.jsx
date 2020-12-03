import React, { useEffect } from 'react';
import {Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux" 


const FormationCard = (props) => {


  return (
    <Card border="dark" style={{ width: '18rem' }} className="my-4">
      <Card.Header><Link to={`/formations/${props.id}`}>{props.title}</Link></Card.Header>
      <Card.Body>
        <Card.Title>Description : </Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default FormationCard;