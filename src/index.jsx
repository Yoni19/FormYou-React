import React, {useState, useEffect} from 'react';
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
import {Provider} from "react-redux"
import store from "./redux/store"
import Admin from './Pages/Admin'
import Formation from './Pages/AdminFormation'
import Session from './Pages/AdminSession'
import UserGestion from './Pages/AdminUserGestion'

const App = () => {
  const [cookie, setCookie] = useState('')

  return (
    <Provider store={store}>
      <Router>
        <main>
          <NavBar onClickLogout={() => setCookie('cookie removed')}/>
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
                  <Route exact path="/admin">
                  <Admin/>
                </Route>
                <Route exact path="/admin/formation"> 
                <Formation/>
                </Route>
                <Route exact path="/admin/session"> 
                <Session/>
                </Route>
                <Route exact path="/admin/users-gestion"> 
                <UserGestion/>
                </Route>
              </Switch>
            </div>
          </main>
        </Router>
      </Provider>
  )
}


ReactDOM.render(<App />, document.querySelector("#root"));