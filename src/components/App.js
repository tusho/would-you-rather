import React, { Component } from 'react';
import NavBar from './navbar.js'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
        <NavBar />
      </div>
    )
  }
}

export default connect()(App);
