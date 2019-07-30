import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import api from '../../api.js'
import { Col } from 'reactstrap'

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    api.getMyRecipes().then(info => {
      console.log('TCL: MyRecipes -> info', info)
      //console.log("TCL: CrudTodos -> response", response);
      setRecipes(info)
      console.log('TCL: MyRecipes -> setRecipes', setRecipes)
    })
  }, [])

  // This is the search bar
  // function filterBySearch(allRecipes) {
  //   return allRecipes.filter(
  //     recipe =>
  //       recipe.name.toUpperCase().includes(search.toUpperCase()) ||
  //       recipe.categories
  //         .join()
  //         .toUpperCase()
  //         .includes(search.toUpperCase())
  //   )
  // }

  return (
    <Col>
      nothin here yet
      {/* <div className="border-0 search-bar" />
      <div className="grid">
        {recipes.map((recipe, i) => (
          <div className="box">
            <div className="imgBox" tag={Link} to="/">
              <div className="boxText border"> {recipe.name} </div>
            </div>
          </div>
        ))}
      </div>
      {JSON.stringify(recipes)} */}
    </Col>
  )
}
