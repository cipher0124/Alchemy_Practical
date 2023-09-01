import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class HomePage extends Component {
  render() {
    return (
      <div className='container'><h1><Link className='text-center' to={`products`}>Click here to start project...</Link></h1></div>
    )
  }
}
