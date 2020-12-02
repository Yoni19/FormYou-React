import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux" 
import { logoutSuccess } from '../../redux/authentication/authActions'





const NavBar = (props) => {
 
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const dispatch = useDispatch()
  const history = useHistory();
  useEffect(() => {
    console.log('isLoggedIn changed')
  }, [isLoggedIn])

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
  const tokenCookie = Cookies.get('token')

  const handleClickLogout = () => {
      fetch('https://api-rails-form-you.herokuapp.com/logout', {
        method: 'delete',
        Bearer: {
          'token': `${tokenCookie}`, 
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response)
        console.log(Cookies.get("token"))
        Cookies.remove("token")
        dispatch(logoutSuccess())
        history.push("/")
      })
      .catch((error) => console.log(error));
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Link to="/" className="navbar-brand" >FormYou</Link>
      <Nav className="mr-auto">      
        <Link to="/calendar" className="nav-link" >Calendrier</Link>
        <Link to="/profil" className="nav-link" >Profil</Link>
      </Nav>
      { tokenCookie && (
        <Button className="btn btn-danger btn-sm mr-2" onClick={handleClickLogout}>Se déconnecter</Button>
      )} 
      { !tokenCookie && (
        <>
          <Link to="/signup" className="btn btn-primary btn-sm mr-2" >S'inscrire</Link>
          <Link to="/login" className="btn btn-primary btn-sm mr-4" >Se connecter</Link>
        </>
      )}
    </Navbar>
  )
}


export default NavBar;