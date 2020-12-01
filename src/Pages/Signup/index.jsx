import {Form, Button} from 'react-bootstrap'
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";

const Signup = () => {

  const history = useHistory();
  const registration = () => {
    const data = { user: {
        email: document.getElementById('email').value,
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        status: document.getElementById('status').value,
        password: document.getElementById('password').value
      }
    };
    console.log(data)
    console.log(JSON.stringify(data))
    fetch('http://localhost:3001/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      for (var pair of response.headers.entries()) { // accessing the entries
        console.log(pair)
        if (pair[0] === "authorization") { // key I'm looking for in this instance
        Cookies.set("token", pair[1])        }
      }
      return response.json()
    })
    .then((response) => {
      console.log(response)
      console.log(Cookies.get("token"))
      history.push('/')
    })
  
    .catch((error) => console.log(error))
  }

  return (
    <>
    <h1 className="text-center" style={{marginTop: "50px", marginBottom: "50px"}}>Inscrivez-vous sur notre super site !</h1>
    <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
      <Form style={{width: "45%", marginTop: "50px"}} onSubmit={(e) => {
        e.preventDefault();
        registration();
      }}>
        <Form.Group controlId="formBasicEmail" >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" id="email"/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formfirstname">
          <Form.Control placeholder="Enter firstname" id="firstname"/>
        </Form.Group>
        <Form.Group controlId="formlastname">
          <Form.Control placeholder="Enter lastname" id="lastname"/>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Select your status</Form.Label>
          <Form.Control as="select" id="status">
            <option>Student</option>
            <option>Teacher</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="password"/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
    </>
  )

}


export default Signup;