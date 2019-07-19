import React, { Component } from 'react'
import Navbar from './Navbar.js'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard.js'
import LoadingBar from 'react-redux-loading-bar'
import Login from './Login.js'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <LoadingBar />
        {this.props.login === true
          ? <Login /> 
          : <Dashboard />}
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    login: authedUser === null,
  }
}

export default connect(mapStateToProps)(App)
