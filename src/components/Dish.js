import React, { Component } from 'react'
import axios from 'axios'

class Dish extends Component {
  state = {
    name: '',
    origin: '',
    newDish: {}
  }

  handleChange = event => {
    if (event.target.placeholder === 'name') {
      this.setState({ name: event.target.value })
    } else {
      this.setState({ origin: event.target.value })
    }
  }

  addNewDish = event => {
    axios
      .post('https://localhost:5001/api/Dish', {
        name: this.state.name,
        origin: this.state.origin
      })
      .then(resp => {
        this.setState({
          newDish: resp.data
        })
      })

    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addNewDish}>
          <input
            type="text"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="origin"
            value={this.state.origin}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Dish</th>
              <th>Origin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.newDish.id}</td>
              <td>{this.state.newDish.name}</td>
              <td>{this.state.newDish.origin}</td>
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

export default Dish
