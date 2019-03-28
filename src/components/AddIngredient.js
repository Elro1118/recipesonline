import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import axios from 'axios'

const log = type => console.log.bind(console, type)

class AddIngredient extends Component {
  state = {
    formSchema: {
      title: 'Add a new ingredient',
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', title: 'Name', default: 'A new ingredient' },
        organic: { type: 'boolean', title: 'Is it organic?', default: false }
      }
    }
  }

  onSubmit = event => {
    axios
      .post('https://localhost:5001/api/Ingredient', event.formData)
      .then(resp => {
        console.log(resp)
        if (resp.status === 201) {
          const oldForm = this.state.formSchema
          oldForm.properties.name.default = 'A new ingredient'
          oldForm.properties.organic.default = false
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

export default AddIngredient
