import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class DishList extends Component {
  state = {
    dish: [],
    requestStatus: 0
  }

  componentDidMount() {
    this.displayDishList()
  }

  displayDishList = () => {
    axios.get('https://localhost:5001/api/Dish').then(resp => {
      console.log(resp)
      this.setState({
        dish: resp.data
      })
    })
  }

  deleteDish = event => {
    console.log(event.target.value)
    axios
      .delete(`https://localhost:5001/api/Dish/${event.target.value}`)
      .then(resp => {
        console.log(resp)

        if (resp.status === 200) {
          this.displayDishList()
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
              <th scope="col">Name</th>
              <th scope="col">Origin</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dish.map((m, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{m.id}</th>
                  <td>{m.name}</td>
                  <td>{m.origin}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      value={m.id}
                      onClick={this.deleteDish}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link to={`/UpdateDish/${m.id}/${m.name}/${m.origin}`}>
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

export default DishList
