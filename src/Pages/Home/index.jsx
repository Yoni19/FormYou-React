  import userEvent from "@testing-library/user-event";
  import React, {useState} from "react";
  import PageList from "../../components/formationCardList"
  import {useSelector} from "react-redux"


  const Home = () => {

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