import React, { Component } from 'react'

const schema = {
  title: '',
  type: 'object',
  properties: {
    search: {
      type: 'string',
      title: 'Search',
      default: ''
    }
  }
}

const uiSchema = {
  search: { 'ui:title': '', 'ui:placeholder': 'Search your food...' }
}
class Search extends Component {
  render() {
    return (
      <>
        <div className="custom-control custom-radio custom-control-inline">
          <input
            type="radio"
            id="customRadioInline1"
            name="customRadioInline1"
            className="custom-control-input"
          />
          <label className="custom-control-label" htmlFor="customRadioInline1">
            Ingredient
          </label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input
            type="radio"
            id="customRadioInline2"
            name="customRadioInline1"
            className="custom-control-input"
          />
          <label className="custom-control-label" htmlFor="customRadioInline2">
            Dish
          </label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input
            type="radio"
            id="customRadioInline3"
            name="customRadioInline1"
            className="custom-control-input"
          />
          <label className="custom-control-label" htmlFor="customRadioInline3">
            Recipe
          </label>
        </div>
      </>
    )
  }
}

export default Search
