import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Ingredient from './components/Ingredient'
import Home from './pages/Home'
import Dish from './components/Dish'
import Recipe from './components/Recipe'

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Ingredient" component={Ingredient} />
            <Route exact path="/Dish" component={Dish} />
            <Route exact path="/Recipe" component={Recipe} />
            {/*<Route exact path="/ThreeAnimalsTotal" component={ThreeAnimals} /> */}
          </Switch>
        </Router>
      </>
    )
  }
}

export default App
