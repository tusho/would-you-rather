import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { handleAnswer } from '../actions/shared'

class Question extends Component {


    handleClick = (vote, e) => {
        e.preventDefault()
        const { id, handleAnswer } = this.props
        handleAnswer(id, vote)
    }




    render() {

        const { question, authedUser, questionIds, id } = this.props
        
        if (questionIds.includes(id) === false) {
            return (
                <div>
                    <h5>Error 404</h5>
                    <p>This question does not exist</p>
                </div>
            )
        }

        const { name, avatar, optionOne, optionTwo } = question
        const allVotes = optionOne.votes.concat(optionTwo.votes)
        const numberVotes = allVotes.length
        const numberOptionOne = optionOne.votes.length
        const percentageOptionOne = Math.round(100 * (numberOptionOne/numberVotes))
        const numberOptionTwo = optionTwo.votes.length
        const percentageOptionTwo = Math.round(100 * (numberOptionTwo/numberVotes))
        
        return (
            
            <Link to={`/question/${id}`} className='question-info p-2' style={{ textDecoration: 'none' }}>
                <div className='question d-flex flex-column'>
                    <div className='question-info p-2'>
                    <h4 className="questions-headline">{name} asks:</h4>
                        <div className="row">
                            <div className='col-2'><img src={avatar} className='avatar' alt={`Avatar of ${name}`} /></div>
                            <div className='col-10'>
                                <h5>Would you rather</h5>
                                <div className='question pointer'>
                                    {allVotes.includes(authedUser) ? 
                                        <div className='row m-0 p-2 w-100'>
                                            <h6>Results:</h6>
                                            <p className='w-100'>You have already answered this question.</p>
                                            <div className={'col-12 votes m-1 ' + (optionOne.votes.includes(authedUser) && 'vote-highlighted')} value='optionOne'>
                                                <p><b>{optionOne.text}</b></p>
                                                <p>{numberOptionOne} out of {numberVotes} votes ({percentageOptionOne}%).</p>
                                            </div> 
                                            <div className={'col-12 votes m-1 ' + (optionTwo.votes.includes(authedUser) && 'vote-highlighted')}>
                                                <p><b>{optionTwo.text}</b></p>
                                                <p>{numberOptionTwo} out of {numberVotes} votes ({percentageOptionTwo}%).</p>
                                            </div>
                                        </div>
                                    :
                                        <div className='row m-0 p-2 w-100'>
                                            <div className='col-12 btn btn-primary m-1' onClick={(e) => this.handleClick('optionOne', e)}>{optionOne.text}</div>
                                            <div className='col-12 btn btn-primary m-1' onClick={(e) => this.handleClick('optionTwo', e)}>{optionTwo.text}</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

        )
        
    }
    
}


function mapStateToProps ({ authedUser, users, questions }, props) {

    if (props.id) {
        const question = questions[props.id]
        return {
            id: props.id,
            authedUser,
            question: formatQuestion(question, users[question.author]),
            questionIds: Object.keys(questions),
        }
    } else {
        const { id } = props.match.params
        const questionIds = Object.keys(questions)
        if (questionIds.includes(id)) {
            const question = questions[id]
                return {
                    id,
                    authedUser,
                    question: formatQuestion(question, users[question.author]),
                    questionIds
                }
        } else {
            return {
                id,
                questionIds,
            }

        }
        
    }
  
}


function mapDispatchToProps (dispatch) {

    return {
        handleAnswer: (id, vote) => {
            dispatch(handleAnswer(id, vote))
        }
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Question)