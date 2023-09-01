import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ShowProducts from './screens/ShowProducts'
import AddEditProduct from './screens/AddEditProduct'
import PageNotFound from './screens/PageNotFound'
import HomePage from './screens/HomePage'
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";                     

import 'primeicons/primeicons.css';
        


const App = () => {
  return (
    <Router>
      <Switch>
      <Route exact path='/' component={HomePage} />
        <Route exact path='/addProduct' component={AddEditProduct} />
        <Route exact path='/editProduct/:id' component={AddEditProduct} />
        <Route exact path='/products' component={ShowProducts} />
        <Route exact path='*' component={PageNotFound} />
      </Switch>
    </Router>
  )
}

export default App
