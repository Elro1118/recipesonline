import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddIngredient from './components/AddIngredient'
import Home from './pages/Home'
import AddDish from './components/AddDish'
import AddRecipe from './components/AddRecipe'
import IngredientList from './components/IngredientList'
import UpdateIngredient from './components/UpdateIngredient'

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/AddIngredient" component={AddIngredient} />
            <Route exact path="/AddDish" component={AddDish} />
            <Route exact path="/AddRecipe" component={AddRecipe} />
            <Route exact path="/IngredientList" component={IngredientList} />
            <Route
              exact
              path="/UpdateIngredient/:id/:name/:organic"
              component={UpdateIngredient}
            />
          </Switch>
        </Router>
      </>
    )
  }
}

export default App
