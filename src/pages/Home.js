import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        <h1> Your Recipes</h1>
        <ul>
          <li>
            <Link to={`/Ingredient`}>Add New Ingredient</Link>
          </li>
          <li>
            <Link to={`/Dish`}>Add New Dish</Link>
          </li>
          <li>
            <Link to={`/Recipe`}>Add New Recipe</Link>
          </li>
          <li>Ingredient List</li>
          <li>Dish List</li>
          <lis>Recipe List</lis>
        </ul>
      </div>
    )
  }
}

export default Home
