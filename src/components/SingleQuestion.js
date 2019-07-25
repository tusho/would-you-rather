import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { voteQuestion } from '../actions/questions';
import { voteUser } from '../actions/users';

class SingleQuestion extends Component {


    handleClick = (vote) => {
        const { authedUser, id } = this.props;
        this.props.voteQuestion(authedUser, id, vote);
        this.props.voteUser(authedUser, id, vote);
    }



    render() {
        const { question, authedUser, questionIds, id } = this.props
        
        if (questionIds.includes(id) === false) {
            return <p>This question does not exist</p>
        }

        const { name, avatar, optionOne, optionTwo } = question
        const allVotes = optionOne.votes.concat(optionTwo.votes)
        
        return (
            <div className='question d-flex flex-column'>
                <div className='question-info p-2'>
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
                                        <div className='col-12 btn btn-primary m-1' onClick={() => this.handleClick('optionOne')}>{optionOne.text}</div>
                                        <div className='col-12 btn btn-primary m-1' onClick={() => this.handleClick('optionTwo')}>{optionTwo.text}</div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps ({ authedUser, users, questions }, props) {
    const { id } = props.match.params
    const question = questions[id]
  
    return {
        authedUser,
        id,
        question: formatQuestion(question, users[question.author]),
        questionIds: Object.keys(questions),
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleQuestion)