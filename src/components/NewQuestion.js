import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveQuestion } from '../actions/questions';
import { formatNewQuestion } from '../utils/helpers'

class newQuestion extends Component {

  state = { optionOne: '', optionTwo: '', submitted: false}

  handleInput = (e, selectedOption) => {
      switch(selectedOption) {
        case 'optionOne':
            this.setState({optionOne: e.target.value});
            break;
        case 'optionTwo':
            this.setState({optionTwo: e.target.value});
            break;
        default:
            this.setState({ optionOne: '', optionTwo: ''})
      }
      
  }

  handleSubmit() {
      const newQuestion = formatNewQuestion(this.state.optionOne, this.state.optionTwo, this.props.authedUser)
      this.props.saveQuestion(newQuestion)
      this.setState({ submitted: true })
  }

  render() {
    
    return (
        <div className='newQuestion'>
            { this.state.submitted ? 
                <div>
                    <h3>You have successfully created a question</h3>
                </div> :
                <div>
                    <h3>Create a new Question</h3>
                    <div className='form-group'>
                        <label className='question-copy'>Would you rather</label>
                        <input className='form-control' placeholder='Option 1' onChange={(e) => this.handleInput(e, 'optionOne')} />
                        <label className='question-copy'>or</label>
                        <input className='form-control' placeholder='Option 2' onChange={(e) => this.handleInput(e, 'optionTwo')}/>
                    </div>
                    <button className="btn btn-primary" onClick={() => this.handleSubmit()}>Submit</button>
                </div>
            }
      </div>
    )

  }

}



function mapStateToProps ({ questions, authedUser, dispatch }) {

  return {
    questions,
    authedUser,
    dispatch,
  }

}

function mapDispatchToProps (dispatch) {

    return {
        saveQuestion: (newQuestion) => {
            dispatch(saveQuestion(newQuestion))
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(newQuestion)