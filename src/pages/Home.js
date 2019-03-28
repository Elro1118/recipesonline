import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        <h1> Your Recipes</h1>
        <ul>
          <li>
            <Link to={`/AddIngredient`}>Add New Ingredient</Link>
          </li>
          <li>
            <Link to={`/AddDish`}>Add New Dish</Link>
          </li>
          <li>
            <Link to={`/AddRecipe`}>Add New Recipe</Link>
          </li>
          <li>
            <Link to={`/IngredientList`}>Ingredient List</Link>
          </li>
          <li>
            <Link to={`/DishList`}>Dish List</Link>
          </li>
          <li>Recipe List</li>
        </ul>
      </div>
    )
  }
}

export default Home
