import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Navbar from './Navbar.js'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading-bar'
import Dashboard from './Dashboard.js'
import Leaderboard from './Leaderboard.js'
import Login from './Login.js'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <LoadingBar />
          {this.props.login === true ? 
            <Login />
            :
            <div className='app-container'>
            <Route path='/' exact component={Dashboard} />
            <Route path='/leaderboard' exact component={Leaderboard} />
          </div>
          }
          
        </div>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    login: authedUser === null,
  }
}

export default connect(mapStateToProps)(App)
