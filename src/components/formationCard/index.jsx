import React from 'react';
import {Card} from 'react-bootstrap';


const FormationCard = (props) => {


  return (
    <Card border="dark" style={{ width: '18rem' }} className="my-4">
    <Card.Header>{props.title}</Card.Header>
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