import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question.js'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div>
        <h3 className='text-center'>Polls</h3>
          <ul className='list-unstyled'>
              {this.props.questionIds.map((id) => (
                  <Question id={id}  key={id}/>
              ))}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ questions }) {

  return {
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)