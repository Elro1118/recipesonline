import React, { Component } from 'react'
import axios from 'axios'
class Ingredient extends Component {
  state = {
    name: '',
    newIngredient: {}
  }

  handleChange = event => {
    this.setState({ name: event.target.value })
  }

  addNewIngredient = event => {
    axios
      .post('https://localhost:5001/api/Ingredient', { name: this.state.name })
      .then(resp => {
        this.setState({
          newIngredient: resp.data
        })
      })

    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addNewIngredient}>
          <input
            type="text"
            placeholder="name"
            value={this.state.name}
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
              <td>{this.state.newIngredient.id}</td>
              <td>{this.state.newIngredient.name}</td>
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

export default Ingredient
