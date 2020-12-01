import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
 



// const Logout = () => {
//   const history = useHistory();
//   fetch('http://localhost:3001/logout', {
//       method: 'delete',
//       headers: {
//         'Authorization': `Bearer ${Cookies.get("token")}`, 
//         'Content-Type': 'application/json'
//       }
//     })
//     .then((response) => {
//       console.log(response)
//       console.log(Cookies.get("token"))
//       history.push('/')
//     })
//     .catch((error) => console.log(error))
// }

const NavBar = () => {



  const isLogged = () => {
    if (Cookies.get("token")) {
      console.log("cookie exists");
      console.log(Cookies.get("token"));
      return (
        <div>
          <Button className="btn btn-danger btn-sm mr-2" onClick={() => {  
            fetch('http://localhost:3001/logout', {
      method: 'delete',
      Baerer: {
        'token': `${Cookies.get("token")}`, 
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response)
      console.log(Cookies.get("token"))
    })
    .catch((error) => console.log(error))}} >Se déconnecter</Button>
        </div>
      )
    } else {
      console.log("cookie does not exist")
      console.log(Cookies.get("token"));
      return (
        <>
          <Link to="/signup" className="btn btn-primary btn-sm mr-2" >S'inscrire</Link>
          <Link to="/login" className="btn btn-primary btn-sm mr-4" >Se connecter</Link>
        </>
      )
    }
  }



  return (
    <Navbar bg="dark" variant="dark">
    <Link to="/" className="navbar-brand" >FormYou</Link>
    <Nav className="mr-auto">      
      <Link to="/calendar" className="nav-link" >Calendrier</Link>
      <Link to="/profil" className="nav-link" >Profil</Link>
    </Nav>
    {isLogged()}
  </Navbar>
  )
}


export default NavBar;