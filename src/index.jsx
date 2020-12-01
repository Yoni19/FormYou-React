import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from "./components/Navbar"
import Home from './Pages/Home'
import Calendar from './Pages/Calendar'
import Profil from './Pages/Profile'
import FormationDetail from "./Pages/FormationDetail"
import Signup from './Pages/Signup'
import Login from "./Pages/Login"
const App = () => {
  return (
    <Router>
      <main>
        <NavBar />
          <div>
            <Switch>
              <Route path="/formation-detail/:formation_title">
                <FormationDetail />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>    
              <Route path="/login">
                <Login />
              </Route>               
              <Route path="/calendar">
                <Calendar />
              </Route>
              <Route path="/profil">
                <Profil />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </main>
      </Router>
  )
}


ReactDOM.render(<App />, document.querySelector("#root"));