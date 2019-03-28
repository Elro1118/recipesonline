import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import axios from 'axios'

const log = type => console.log.bind(console, type)

class AddRecipe extends Component {
  state = {
    formSchema: {
      title: 'Add a new recipe',
      type: 'object',
      required: ['quantity', 'unit'],
      properties: {
        quantity: { type: 'number', title: 'Quantity', default: 0 },
        unit: { type: 'string', title: 'Unit', default: 'spoon' }
      }
    },
    uiSchema: {
      'ui:order': ['quantity', 'unit'],
      id: { 'ui:widget': 'hidden' }
    }
  }

  componentDidMount() {
    this.displayDishList()
  }

  displayDishList = () => {
    axios.get('https://localhost:5001/api/Dish').then(resp => {
      console.log(resp)
      const oldForm = this.state.formSchema
      oldForm.properties.dishId = {
        type: 'number',
        title: 'Pick a dish',
        enum: resp.data.map(dish => dish.id),
        enumNames: resp.data.map(dish => dish.name)
      }

      this.setState(
        {
          formSchema: oldForm,
          uiSchema: {
            'ui:order': ['dishId', 'quantity', 'unit']
          }
        },
        () => {
          this.displayIngredientList()
        }
      )
    })
  }

  displayIngredientList = () => {
    axios.get('https://localhost:5001/api/Ingredient').then(resp => {
      console.log(resp)
      const oldForm = this.state.formSchema
      oldForm.properties.ingredientId = {
        type: 'number',
        title: 'Pick a ingredient',
        enum: resp.data.map(ingredient => ingredient.id),
        enumNames: resp.data.map(ingredient => ingredient.name)
      }
      this.setState({
        formSchema: oldForm,
        uiSchema: {
          'ui:order': ['dishId', 'ingredientId', 'quantity', 'unit']
        }
      })
    })
  }

  onSubmit = event => {
    console.log(event.formData)
    axios
      .post('https://localhost:5001/api/Recipe', event.formData)
      .then(resp => {
        console.log(resp)
      })
  }

  render() {
    return (
      <>
        <Form
          schema={this.state.formSchema}
          uiSchema={this.state.uiSchema}
          onChange={log('changed')}
          onSubmit={this.onSubmit}
          onError={log('errors')}
        />
      </>
    )
  }
}

export default AddRecipe
