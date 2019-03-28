import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import axios from 'axios'

const log = type => console.log.bind(console, type)

class AddDish extends Component {
  state = {
    formSchema: {
      title: 'Add a new dish',
      type: 'object',
      required: ['name', 'origin'],
      properties: {
        name: { type: 'string', title: 'Name', default: 'A new dish' },
        origin: { type: 'string', title: 'Origin', default: 'A country' }
      }
    }
  }

  onSubmit = event => {
    axios.post('https://localhost:5001/api/Dish', event.formData).then(resp => {
      console.log(resp)
      if (resp.status === 201) {
        const oldForm = this.state.formSchema
        oldForm.properties.name.default = 'A new dish'
        oldForm.properties.origin.default = 'A country'
        this.setState({
          formSchema: oldForm
        })
      }
    })
  }
  render() {
    return (
      <>
        <Form
          schema={this.state.formSchema}
          onChange={log('changed')}
          onSubmit={this.onSubmit}
          onError={log('errors')}
        />
      </>
    )
  }
}

export default AddDish
