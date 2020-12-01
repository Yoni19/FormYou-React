  import React from "react";
  import FormationCard from "../../components/formationCard"
  import PageList from "../../components/formationCardList"

  const Home = () => {

    const fetchFormations = () => {
      fetch("http://localhost:3001/formations")
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
      });
      }

    fetchFormations()
    return (
      <div>
        <h1 className="text-center" >Voici la liste de nos formations :</h1>
          <div className="mx-auto" style={{width: "60%", marginTop: "75px"}}>
            <PageList/>
          </div>
      </div>
    )
    }
  
    export default Home;