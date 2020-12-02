
import React, { useEffect, useState } from "react";
import FormationCard from '../../components/formationCard'

const PageList = () => {
 
  const [formations, setFormation] = useState([]);
    const fetchList = () => {
      fetch("https://api-rails-form-you.herokuapp.com//formations")
        .then((response) => response.json())
        .then((response) => {
        setFormation(response)
            
          });
      };
 
      useEffect(() => {
        fetchList();
      }, []);
    ;
    
    return (
      <div className= "Formations row wrap justify-content-between mx-4 my-4">
        {formations.map((formation) => {
            return <FormationCard title={formation.title} description={formation.description} />
        })}


      </div>
    )
  };



export default PageList;