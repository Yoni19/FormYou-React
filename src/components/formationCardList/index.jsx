
import React, { useEffect, useState } from "react";
import FormationCard from '../../components/formationCard'

const PageList = () => {
 
    const [formations, setFormations] = useState([])
    const [categories, setCategories] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [chosenCategory, setChosenCategory] = useState('')

    const fetchList = () => {
      fetch(`https://api-rails-form-you.herokuapp.com/formations?search=${inputValue}`)
        .then((response) => response.json())
        .then((response) => {
          setFormations(response)        
        });
    };

    const fetchListCategory = () => {
      fetch(`https://api-rails-form-you.herokuapp.com/formations?category=${chosenCategory}`)
        .then((response) => response.json())
        .then((response) => {
          setFormations(response)        
        });
    };
    const fetchCategories = () => {
      fetch(`https://api-rails-form-you.herokuapp.com/categories`)
        .then((response) => response.json())
        .then((response) => {
          setCategories(response)        
        });      
    }
    
    useEffect(() => {
      fetchList()
    }, [inputValue])

    useEffect(() => {
      if(chosenCategory){
        fetchListCategory()
      }
    }, [chosenCategory]);

    useEffect(() => {
      fetchCategories()
    }, [])
    
    return (
      <>
        <input className="form-control my-2" type="text" placeholder="Search.." onChange={(e) => setInputValue(e.currentTarget.value)}/>
        <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => setChosenCategory(e.currentTarget.value)}>
          <option value="">Want to choose a category ?</option>
          {categories.map((category) => {
              return  <option value={category.id}>{category.name}</option> 
          })}
        </select>
        <div className= "Formations row wrap justify-content-between mx-4 my-4">
          {formations.map((formation) => {
              return <FormationCard title={formation.title} description={formation.description} id={formation.id}/>
          })}
        </div>
      </>
    )
  };



export default PageList;