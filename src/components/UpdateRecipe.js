import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import axios from 'axios'
import { Link } from 'react-router-dom'

const log = type => console.log.bind(console, type)

class UpdateRecipe extends Component {
  state = {
    formSchema: {
      title: 'Update a recipe',
      type: 'object',
      required: ['quantity', 'unit'],
      properties: {
        id: {
          type: 'number',
          title: 'Id',
          default: parseInt(this.props.match.params.id)
        },
        quantity: {
          type: 'number',
          title: 'Quantity',
          default: parseInt(this.props.match.params.quantity)
        },
        unit: {
          type: 'string',
          title: 'Unit',
          default: this.props.match.params.unit
        },
        dishId: {
          type: 'number',
          title: 'DishId',
          default: parseInt(this.props.match.params.dishId)
        },
        ingredientId: {
          type: 'number',
          title: 'IngredientId',
          default: parseInt(this.props.match.params.ingredientId)
        }
      }
    },
    uiSchema: {
      id: { 'ui:widget': 'hidden' },
      dishId: { 'ui:widget': 'hidden' },
      ingredientId: { 'ui:widget': 'hidden' }
    },
    requestStatus: 0
  }

  onSubmit = event => {
    axios
      .put(
        `https://localhost:5001/api/Recipe/${this.props.match.params.id}`,
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
            <Link to={`/RecipeList`}>Recipe List</Link>.
          </div>
        ) : (
          <>
            <h2>Dish: {this.props.match.params.dish}</h2>
            <h3>Ingredient: {this.props.match.params.ingredient}</h3>
            <Form
              schema={this.state.formSchema}
              uiSchema={this.state.uiSchema}
              onChange={log('changed')}
              onSubmit={this.onSubmit}
              onError={log('errors')}
            />
          </>
        )}
      </>
    )
  }
}

export default UpdateRecipe
