import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { voteQuestion } from '../actions/questions';
import { voteUser } from '../actions/users';
import { Link } from 'react-router-dom'

class Question extends Component {


    handleClick = (vote, e) => {
        e.preventDefault();
        const { authedUser, id } = this.props;
        this.props.voteQuestion(authedUser, id, vote);
        this.props.voteUser(authedUser, id, vote);
    }



    render() {
        const { question, authedUser } = this.props
        
        if (question === null) {
            return <p>This question does not exist</p>
        }

        const { name, avatar, optionOne, optionTwo, id } = question
        const allVotes = optionOne.votes.concat(optionTwo.votes)
        
        return (
            <li className='question d-flex flex-column'>
                <Link to={`/question/${id}`} className='question-info p-2' style={{ textDecoration: 'none' }}>
                    <h4 className="questions-headline">{name} asks:</h4>
                    <div className="row">
                        <div className='col-2'><img src={avatar} className='avatar' alt={`Avatar of ${name}`} /></div>
                        <div className='col-10'>
                            <h5>Would you rather</h5>
                            <div className='question'>
                                {allVotes.includes(authedUser) ? 
                                    <div className='row m-0 p-2 w-100'>
                                        <h6>Results:</h6>
                                        <p className='w-100'>You have already answered this question.</p>
                                        <div className='col-12 votes m-1' value='optionOne'>
                                            <p>{optionOne.text}</p>
                                            <p>{optionOne.votes.length} out of {allVotes.length} votes.</p>
                                        </div> 
                                        <div className='col-12 votes m-1'>
                                            <p>{optionTwo.text}</p>
                                            <p>{optionTwo.votes.length} out of {allVotes.length} votes.</p>
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
                </Link>
            </li>
        )
    }
}


function mapStateToProps ({ authedUser, users, questions, dispatch }, { id }) {
    const question = questions[id]
  
    return {
        authedUser,
        dispatch,
        question: formatQuestion(question, users[question.author]),
    }
}

function mapDispatchToProps (dispatch) {

    return {
        voteQuestion: (authedUser, id, vote) => {
            dispatch(voteQuestion(authedUser, id, vote))
        },
        voteUser: (authedUser, id, vote) => {
        dispatch(voteUser(authedUser, id, vote))
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Question)