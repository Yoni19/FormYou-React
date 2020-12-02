import {Card,Jumbotron} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";



const Admin = () => {
  return(
    <div>
    <Jumbotron>
  <h1>Bienvenue sur votre page administrateur !</h1>
  <p>
    C'est à partir de cette page que vous pourrez créer une formation ou une session et gérer la liste des utilisateurs du site.
  </p>
  <p>
  <Link to="/" className="btn btn-primary btn mr-2" >Revenir à l'accueil </Link>
  </p>
</Jumbotron>
<Card style={{ width: '18rem' }}>
  <Card.Body>
   
    <Card.Subtitle className="mb-2 text-muted">Formations</Card.Subtitle>
    <Card.Text>
     Créer une nouvelle formation
    </Card.Text>
    <Link to="/admin/formation" className="btn btn-primary btn mr-2" >Créer </Link>

  </Card.Body>
</Card>

<Card style={{ width: '18rem' }}>
  <Card.Body>
   
    <Card.Subtitle className="mb-2 text-muted">Sessions</Card.Subtitle>
    <Card.Text>
     Créer une nouvelle session
    </Card.Text>
    <Link to="/admin/session" className="btn btn-primary btn mr-2" >Créer </Link>

  </Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
  <Card.Body>
   
    <Card.Subtitle className="mb-2 text-muted">Utilisateurs</Card.Subtitle>
    <Card.Text>
     Gerez les utilisateurs de FormYou
    </Card.Text>
    <Link to="/admin/users-gestion" className="btn btn-primary btn mr-2" >Page de gestion </Link>

  </Card.Body>
</Card>
    </div>
  )
}

export default Admin