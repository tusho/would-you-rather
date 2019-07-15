import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question.js'
import Login from './Login.js'

class Dashboard extends Component {
  render() {
    const { users, authedUser } = this.props
    return (
      <div>
        {authedUser === null ? <Login />
        : 
        <div>
        <h3 className='text-center'>Polls</h3>
          <ul className='list-unstyled'>
              {this.props.questionIds.map((id) => (
                  <Question id={id}  key={id}/>
              ))}
          </ul>
        </div>
        }
      </div>
    )
  }
}

function mapStateToProps ({ questions, authedUser }) {

  return {
    authedUser,
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)