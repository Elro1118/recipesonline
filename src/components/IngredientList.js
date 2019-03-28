import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
class IngredientList extends Component {
  state = {
    ingredient: [],
    requestStatus: 0
  }

  componentDidMount() {
    this.displayIngredientList()
  }

  displayIngredientList = () => {
    axios.get('https://localhost:5001/api/Ingredient').then(resp => {
      console.log(resp)
      this.setState({
        ingredient: resp.data
      })
    })
  }

  deleteIngredient = event => {
    console.log(event.target.value)
    axios
      .delete(`https://localhost:5001/api/Ingredient/${event.target.value}`)
      .then(resp => {
        console.log(resp)

        if (resp.status === 200) {
          this.displayIngredientList()
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
              <th scope="col">Ingredient</th>
              <th scope="col">Organic</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ingredient.map((m, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{m.id}</th>
                  <td>{m.name}</td>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=" "
                      id="defaultCheck1"
                      disabled
                      checked={m.organic}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      value={m.id}
                      onClick={this.deleteIngredient}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/UpdateIngredient/${m.id}/${m.name}/${m.organic}`}
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

export default IngredientList
