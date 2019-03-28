import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class RecipeList extends Component {
  state = {
    recipe: [],
    requestStatus: 0
  }

  componentDidMount() {
    this.displayRecipeList()
  }

  displayRecipeList = () => {
    axios.get('https://localhost:5001/api/Recipe').then(resp => {
      console.log(resp)
      this.setState({
        recipe: resp.data
      })
    })
  }

  deleteRecipe = event => {
    console.log(event.target.value)
    axios
      .delete(`https://localhost:5001/api/Recipe/${event.target.value}`)
      .then(resp => {
        console.log(resp)

        if (resp.status === 200) {
          this.displayRecipeList()
          this.setState({
            requestStatus: resp.status
          })
        }
      })
  }

  render() {
    return (
      <>
        {this.state.requestStatus === 200 ? (
          <div className="alert alert-success" role="alert">
            It deleted successfully. Click it if you would like to go{' '}
            <Link to={`/`}>home</Link>.
          </div>
        ) : (
          <></>
        )}

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Dish</th>
              <th scope="col">Ingredient</th>
              <th scope="col">Quantity</th>
              <th scope="col">Unit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.recipe.map((m, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{m.id}</th>
                  <td>{m.dish.name}</td>
                  <td>{m.ingredient.name}</td>
                  <td>{m.quantity}</td>
                  <td>{m.unit}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      value={m.id}
                      onClick={this.deleteRecipe}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/UpdateRecipe/${m.id}/${m.dish.name}/${
                        m.ingredient.name
                      }/${m.quantity}/${m.unit}/${m.dish.id}/${
                        m.ingredient.id
                      }`}
                    >
                      <button className="btn btn-warning">Update</button>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }
}

export default RecipeList
