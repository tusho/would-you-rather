import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'

class Question extends Component {
    render() {
        const { question, authedUser } = this.props
        
        if (question === null) {
            return <p>This question does not exist</p>
        }

        const { name, avatar, timestamp, optionOne, optionTwo, id } = question
        const whoVoted = optionOne.votes.concat(optionTwo.votes)
        
        return (
            <li className='question d-flex flex-column'>
                <div className='question-info p-2'>QUESTION ID: {id}</div>
                <div className='question-info p-2'>Poll was created by: {name} </div>
                <div className='question-info p-2'>Poll was created at: {formatDate(timestamp)} </div>
                <div className='question-info p-2'>This is his/her avatar: <img src={avatar} className='avatar' alt={`Avatar of ${name}`} /> </div>
                <div className='question-info p-2'>You voted for this poll: {(whoVoted.includes(authedUser) ? 'true' : 'false')} </div>
                <div className='question-info p-2'>You created this poll: {(name.toLowerCase().replace(/\s+/g, '') === authedUser ? 'true' : 'false')} </div>
                <div className='question-info p-2'>Question Option One: {optionOne.text} </div>
                <div className='question-info p-2'>Votes for Option One: {optionOne.votes.length} </div>
                <div className='question-info p-2'>Question Option Two: {optionTwo.text} </div>
                <div className='question-info p-2'>Votes for Option Two: {optionTwo.votes.length}</div>
            </li>
        )
    }
}


function mapStateToProps ({ authedUser, users, questions }, { id }) {
    const question = questions[id]
  
    return {
        authedUser,
        question: formatQuestion(question, users[question.author])
    }
}


export default connect(mapStateToProps)(Question)