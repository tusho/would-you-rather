import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
    render() {
        const { question } = this.props
        console.log(this.props)
        return (
            <li className="question" key={question.id}>
                QUESTION ID: {question.id} <br />
                Question Option One: {question.optionOne.text} <br />
                Votes for Option One: {question.optionOne.votes.length} <br />
                Question Option Two: {question.optionTwo.text} <br />
                Votes for Option Two: {question.optionTwo.votes.length}
            </li>
        )
    }
}

function mapStateToProps ({ authedUser, questions }, { id }) {
    const question = questions[id]
  
    return {
        authedUser,
        question
    }
}


export default connect(mapStateToProps)(Question)