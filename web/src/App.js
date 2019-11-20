import React, { Component } from 'react'
import Router from './Containers/Pages/Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default class App extends Component {
  render() {
    return (
      <>
        <ToastContainer />
        <Router />
      </>
    )
  }
}
