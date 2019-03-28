import React, { Component } from 'react'
import axios from 'axios'
class Recipe extends Component {
  state = {
    quantity: 0,
    unit: '',
    newRecipe: {},
    ingredientList: [],
    dishList: [],
    ingredientIdSelected: 0,
    dishIdSelected: 0
  }

  componentDidMount() {
    this.displayIngredientList()
    this.displayDishList()
  }

  handleChange = event => {
    if (event.target.placeholder === 'quantity') {
      this.setState({ quantity: event.target.value })
    } else {
      this.setState({ unit: event.target.value })
    }
  }

  addNewRecipe = event => {
    axios
      .post('https://localhost:5001/api/Recipe', {
        quantity: this.state.quantity,
        unit: this.state.unit,
        dishId: this.state.dishIdSelected,
        ingredientId: this.state.ingredientIdSelected
      })
      .then(resp => {
        this.setState({
          newRecipe: resp.data
        })
      })
  }

  displayIngredientList = () => {
    axios.get('https://localhost:5001/api/Ingredient').then(resp => {
      this.setState({
        ingredientList: resp.data
      })
    })
  }

  displayDishList = () => {
    axios.get('https://localhost:5001/api/Dish').then(resp => {
      this.setState({
        dishList: resp.data
      })
    })
  }

  handleChangeSelect = event => {
    if (event.target.id === 'dish') {
      this.setState({
        dishIdSelected: event.target.value
      })
    } else {
      this.setState({
        ingredientIdSelected: event.target.value
      })
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addNewRecipe}>
          <label>
            Pick your dish{' '}
            <select
              value={this.state.dishIdSelected}
              onChange={this.handleChangeSelect}
              id="dish"
            >
              <option defaultValue value="0">
                {' '}
              </option>
              {this.state.dishList.map((m, i) => {
                return (
                  <option key={i} value={m.id}>
                    {m.name}
                  </option>
                )
              })}
            </select>
          </label>
          <label>
            Pick your ingredient{' '}
            <select
              value={this.state.ingredientIdSelected}
              onChange={this.handleChangeSelect}
              id="ingredient"
            >
              <option defaultValue value="0">
                {' '}
              </option>
              {this.state.ingredientList.map((m, i) => {
                return (
                  <option key={i} value={m.id}>
                    {m.name}
                  </option>
                )
              })}
            </select>
          </label>
          <input
            type="text"
            placeholder="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="unit"
            value={this.state.unit}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Ingredient</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.newRecipe.id}</td>
              <td>{this.state.newRecipe.name}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

export default Recipe
