import React, { Component } from 'react'
import axios from 'axios'
import Form from 'react-jsonschema-form'
import { Link } from 'react-router-dom'

const log = type => console.log.bind(console, type)

class UpdateDish extends Component {
  state = {
    formSchema: {
      title: 'Update a dish',
      type: 'object',
      required: ['name', 'origin'],
      properties: {
        id: {
          type: 'number',
          title: 'Id',
          default: parseInt(this.props.match.params.id)
        },
        name: {
          type: 'string',
          title: 'Name',
          default: this.props.match.params.name
        },
        origin: {
          type: 'string',
          title: 'Origin',
          default: this.props.match.params.origin
        }
      }
    },
    uiSchema: {
      id: { 'ui:widget': 'hidden' }
    },
    requestStatus: 0
  }

  onSubmit = event => {
    axios
      .put(
        `https://localhost:5001/api/Dish/${this.props.match.params.id}`,
        event.formData
      )
      .then(resp => {
        console.log(resp)
        if (resp.status === 204) {
          this.setState({ requestStatus: 204 })
        }
      })
  }
  render() {
    return (
      <>
        {this.state.requestStatus === 204 ? (
          <div className="alert alert-secondary" role="alert">
            It updated successfully. Click it if you would like to go{' '}
            <Link to={`/DishList`}>Dish List</Link>.
          </div>
        ) : (
          <Form
            schema={this.state.formSchema}
            uiSchema={this.state.uiSchema}
            onChange={log('changed')}
            onSubmit={this.onSubmit}
            onError={log('errors')}
          />
        )}
      </>
    )
  }
}

export default UpdateDish
