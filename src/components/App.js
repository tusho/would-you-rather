import React, { Component } from 'react'
import Navbar from './Navbar.js'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard.js'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        {this.props.loading === true
          ? null
          : <Dashboard />}
      </div>
    )
  }
}

// Render UI only once application has finished loading the initial data
function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
